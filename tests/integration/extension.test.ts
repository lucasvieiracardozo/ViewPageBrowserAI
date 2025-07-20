// tests/integration/extension.test.ts - Testes de integração da extensão

import {
  getGeminiApiKey,
  setGeminiApiKey,
  clearGeminiApiKey,
  isApiKeyConfigured,
} from '../../src/background/config';

import {
  ErrorLogger,
  ApiKeyError,
  StorageError,
} from '../../src/utils/errors';

// Mock do chrome.storage.sync para simular comportamento real
const mockStorage: Record<string, any> = {};

const mockStorageSync = {
  get: jest.fn((keys: string[]) => {
    const result: Record<string, any> = {};
    keys.forEach(key => {
      if (mockStorage[key] !== undefined) {
        result[key] = mockStorage[key];
      }
    });
    return Promise.resolve(result);
  }),
  set: jest.fn((data: Record<string, any>) => {
    Object.assign(mockStorage, data);
    return Promise.resolve();
  }),
  remove: jest.fn((keys: string[]) => {
    keys.forEach(key => delete mockStorage[key]);
    return Promise.resolve();
  }),
};

beforeEach(() => {
  global.chrome = {
    storage: {
      sync: mockStorageSync,
    },
  } as any;
  
  // Limpa o storage simulado
  Object.keys(mockStorage).forEach(key => delete mockStorage[key]);
  
  // Limpa logs de erro
  ErrorLogger.clearLogs();
  
  jest.clearAllMocks();
});

describe('Integração da Extensão', () => {
  const validApiKey = 'AIzaSyDwCoDRQOLqayAXFGCdsWZKxmXBcxJv31Y';

  describe('Fluxo completo de configuração', () => {
    it('deve executar fluxo completo: verificar -> configurar -> usar -> limpar', async () => {
      // 1. Estado inicial - não configurada
      expect(await isApiKeyConfigured()).toBe(false);
      expect(await getGeminiApiKey()).toBeNull();

      // 2. Configurar API key
      await setGeminiApiKey(validApiKey);
      
      // 3. Verificar configuração
      expect(await isApiKeyConfigured()).toBe(true);
      expect(await getGeminiApiKey()).toBe(validApiKey);
      
      // 4. Verificar que dados foram persistidos corretamente
      expect(mockStorage.geminiApiKey).toBe(validApiKey);
      expect(mockStorage.lastUpdated).toBeGreaterThan(0);

      // 5. Limpar configuração
      await clearGeminiApiKey();
      
      // 6. Verificar limpeza
      expect(await isApiKeyConfigured()).toBe(false);
      expect(await getGeminiApiKey()).toBeNull();
      expect(mockStorage.geminiApiKey).toBeUndefined();
      expect(mockStorage.lastUpdated).toBeUndefined();
    });

    it('deve manter configuração entre sessões (persistência)', async () => {
      // Simula primeira sessão
      await setGeminiApiKey(validApiKey);
      expect(await isApiKeyConfigured()).toBe(true);

      // Simula reinicialização (limpa mocks mas mantém storage)
      jest.clearAllMocks();

      // Simula segunda sessão - dados devem persistir
      expect(await isApiKeyConfigured()).toBe(true);
      expect(await getGeminiApiKey()).toBe(validApiKey);
    });
  });

  describe('Tratamento de erros em cenários reais', () => {
    it('deve tratar falha de storage durante configuração', async () => {
      const storageError = new Error('Storage quota exceeded');
      mockStorageSync.set.mockRejectedValueOnce(storageError);

      await expect(setGeminiApiKey(validApiKey)).rejects.toThrow(StorageError);
      
      // Verifica que o erro foi logado
      const logs = ErrorLogger.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].error.code).toBe('STORAGE_ERROR');
    });

    it('deve tratar falha de storage durante leitura', async () => {
      const storageError = new Error('Storage access denied');
      mockStorageSync.get.mockRejectedValueOnce(storageError);

      await expect(getGeminiApiKey()).rejects.toThrow(StorageError);
      
      // Verifica que o erro foi logado
      const logs = ErrorLogger.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].error.code).toBe('STORAGE_ERROR');
    });

    it('deve tratar gracefully falha de storage em isApiKeyConfigured', async () => {
      const storageError = new Error('Storage access denied');
      mockStorageSync.get.mockRejectedValueOnce(storageError);

      // Deve retornar false em vez de lançar erro (graceful degradation)
      const result = await isApiKeyConfigured();
      expect(result).toBe(false);
      
      // Mas deve logar o erro
      const logs = ErrorLogger.getLogs();
      expect(logs).toHaveLength(1);
    });

    it('deve validar API key antes de salvar', async () => {
      const invalidKeys = [
        '',
        '   ',
        'invalid-key',
        'AIza123', // Muito curta
        null,
        undefined,
        123,
      ];

      for (const invalidKey of invalidKeys) {
        await expect(setGeminiApiKey(invalidKey as any)).rejects.toThrow();
        
        // Storage não deve ter sido chamado
        expect(mockStorageSync.set).not.toHaveBeenCalled();
        jest.clearAllMocks();
      }
    });
  });

  describe('Logging e monitoramento de erros', () => {
    it('deve acumular estatísticas de erros', async () => {
      // Gera diferentes tipos de erro
      mockStorageSync.get.mockRejectedValue(new Error('Storage error 1'));
      mockStorageSync.set.mockRejectedValue(new Error('Storage error 2'));

      try { await getGeminiApiKey(); } catch {}
      try { await setGeminiApiKey(validApiKey); } catch {}
      try { await setGeminiApiKey('invalid'); } catch {}

      const stats = ErrorLogger.getStats();
      expect(stats['STORAGE_ERROR']).toBe(2);
      expect(stats['VALIDATION_ERROR']).toBe(1);
    });

    it('deve limitar número de logs para evitar vazamento de memória', async () => {
      // Gera muitos erros
      for (let i = 0; i < 150; i++) {
        try {
          await setGeminiApiKey('invalid');
        } catch {}
      }

      const logs = ErrorLogger.getLogs();
      expect(logs.length).toBeLessThanOrEqual(100); // MAX_LOGS
    });

    it('deve incluir contexto útil nos logs de erro', async () => {
      try {
        await setGeminiApiKey('invalid-key');
      } catch {}

      const logs = ErrorLogger.getLogs();
      expect(logs).toHaveLength(1);
      
      const errorLog = logs[0];
      expect(errorLog.error.context).toMatchObject({
        keyPrefix: 'invalid-',
      });
      expect(errorLog.error.userMessage).toContain('inválido');
      expect(errorLog.timestamp).toBeGreaterThan(0);
    });
  });

  describe('Performance e timeouts', () => {
    it('deve respeitar timeouts em operações de storage', async () => {
      // Simula operação que nunca resolve
      mockStorageSync.get.mockImplementation(() => new Promise(() => {}));

      const startTime = Date.now();
      
      await expect(getGeminiApiKey()).rejects.toThrow('timed out');
      
      const duration = Date.now() - startTime;
      expect(duration).toBeGreaterThan(4900); // Próximo ao timeout de 5s
      expect(duration).toBeLessThan(6000); // Mas não muito além
    }, 10000);

    it('deve completar operações rápidas sem timeout', async () => {
      mockStorageSync.get.mockResolvedValue({ geminiApiKey: validApiKey });

      const startTime = Date.now();
      const result = await getGeminiApiKey();
      const duration = Date.now() - startTime;

      expect(result).toBe(validApiKey);
      expect(duration).toBeLessThan(100); // Deve ser muito rápido
    });
  });

  describe('Concorrência e condições de corrida', () => {
    it('deve lidar com múltiplas operações simultâneas', async () => {
      const promises = [
        setGeminiApiKey(validApiKey),
        isApiKeyConfigured(),
        getGeminiApiKey(),
      ];

      // Não deve haver erros de concorrência
      await expect(Promise.allSettled(promises)).resolves.toBeDefined();
    });

    it('deve manter consistência durante operações simultâneas', async () => {
      // Configura API key
      await setGeminiApiKey(validApiKey);

      // Executa múltiplas leituras simultâneas
      const readPromises = Array(10).fill(null).map(() => getGeminiApiKey());
      const results = await Promise.all(readPromises);

      // Todos devem retornar o mesmo valor
      results.forEach(result => {
        expect(result).toBe(validApiKey);
      });
    });
  });

  describe('Compatibilidade e robustez', () => {
    it('deve lidar com dados corrompidos no storage', async () => {
      // Simula dados corrompidos
      mockStorage.geminiApiKey = { invalid: 'object' };
      mockStorage.lastUpdated = 'invalid-timestamp';

      // Deve retornar null para dados inválidos
      const result = await getGeminiApiKey();
      expect(result).toBeNull();
    });

    it('deve funcionar mesmo com storage parcialmente disponível', async () => {
      // Simula storage que falha apenas para algumas operações
      mockStorageSync.remove.mockRejectedValue(new Error('Remove failed'));

      await setGeminiApiKey(validApiKey);
      expect(await getGeminiApiKey()).toBe(validApiKey);

      // Clear deve falhar mas não afetar outras operações
      await expect(clearGeminiApiKey()).rejects.toThrow(StorageError);
      
      // API key ainda deve estar lá
      expect(await getGeminiApiKey()).toBe(validApiKey);
    });
  });
});
