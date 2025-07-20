// tests/background/config.test.ts - Testes para o sistema de configuração

import {
  getGeminiApiKey,
  setGeminiApiKey,
  clearGeminiApiKey,
  isApiKeyConfigured,
  getExtensionConfig,
} from '../../src/background/config';

import {
  ApiKeyError,
  StorageError,
  ValidationError,
  TimeoutError,
} from '../../src/utils/errors';

// Mock do chrome.storage.sync
const mockStorageSync = {
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
};

// Configura o mock global
beforeEach(() => {
  global.chrome = {
    storage: {
      sync: mockStorageSync,
    },
  } as any;
  
  jest.clearAllMocks();
});

describe('Config - getGeminiApiKey', () => {
  it('deve retornar a API key quando configurada', async () => {
    const mockApiKey = 'AIzaSyDwCoDRQOLqayAXFGCdsWZKxmXBcxJv31Y';
    mockStorageSync.get.mockResolvedValue({ geminiApiKey: mockApiKey });

    const result = await getGeminiApiKey();

    expect(result).toBe(mockApiKey);
    expect(mockStorageSync.get).toHaveBeenCalledWith(['geminiApiKey']);
  });

  it('deve retornar null quando não configurada', async () => {
    mockStorageSync.get.mockResolvedValue({});

    const result = await getGeminiApiKey();

    expect(result).toBeNull();
  });

  it('deve lançar StorageError quando há erro no storage', async () => {
    const storageError = new Error('Storage access denied');
    mockStorageSync.get.mockRejectedValue(storageError);

    await expect(getGeminiApiKey()).rejects.toThrow(StorageError);
  });

  it('deve lançar TimeoutError quando a operação demora muito', async () => {
    // Simula uma operação que nunca resolve
    mockStorageSync.get.mockImplementation(() => new Promise(() => {}));

    await expect(getGeminiApiKey()).rejects.toThrow(TimeoutError);
  }, 10000);
});

describe('Config - setGeminiApiKey', () => {
  const validApiKey = 'AIzaSyDwCoDRQOLqayAXFGCdsWZKxmXBcxJv31Y';

  it('deve salvar API key válida com sucesso', async () => {
    mockStorageSync.set.mockResolvedValue(undefined);

    await expect(setGeminiApiKey(validApiKey)).resolves.not.toThrow();

    expect(mockStorageSync.set).toHaveBeenCalledWith({
      geminiApiKey: validApiKey,
      lastUpdated: expect.any(Number),
    });
  });

  it('deve lançar ValidationError para API key vazia', async () => {
    await expect(setGeminiApiKey('')).rejects.toThrow(ValidationError);
    await expect(setGeminiApiKey('   ')).rejects.toThrow(ValidationError);
  });

  it('deve lançar ValidationError para API key com formato inválido', async () => {
    await expect(setGeminiApiKey('invalid-key')).rejects.toThrow(ApiKeyError);
    await expect(setGeminiApiKey('AIza123')).rejects.toThrow(ApiKeyError); // Muito curta
  });

  it('deve lançar ValidationError para tipos inválidos', async () => {
    await expect(setGeminiApiKey(null as any)).rejects.toThrow(ValidationError);
    await expect(setGeminiApiKey(123 as any)).rejects.toThrow(ValidationError);
  });

  it('deve trimmar espaços em branco da API key', async () => {
    const keyWithSpaces = `  ${validApiKey}  `;
    mockStorageSync.set.mockResolvedValue(undefined);

    await setGeminiApiKey(keyWithSpaces);

    expect(mockStorageSync.set).toHaveBeenCalledWith({
      geminiApiKey: validApiKey,
      lastUpdated: expect.any(Number),
    });
  });

  it('deve lançar StorageError quando há erro no storage', async () => {
    const storageError = new Error('Storage quota exceeded');
    mockStorageSync.set.mockRejectedValue(storageError);

    await expect(setGeminiApiKey(validApiKey)).rejects.toThrow(StorageError);
  });
});

describe('Config - clearGeminiApiKey', () => {
  it('deve remover API key com sucesso', async () => {
    mockStorageSync.remove.mockResolvedValue(undefined);

    await expect(clearGeminiApiKey()).resolves.not.toThrow();

    expect(mockStorageSync.remove).toHaveBeenCalledWith(['geminiApiKey', 'lastUpdated']);
  });

  it('deve lançar StorageError quando há erro no storage', async () => {
    const storageError = new Error('Storage access denied');
    mockStorageSync.remove.mockRejectedValue(storageError);

    await expect(clearGeminiApiKey()).rejects.toThrow(StorageError);
  });
});

describe('Config - isApiKeyConfigured', () => {
  it('deve retornar true quando API key está configurada', async () => {
    const mockApiKey = 'AIzaSyDwCoDRQOLqayAXFGCdsWZKxmXBcxJv31Y';
    mockStorageSync.get.mockResolvedValue({ geminiApiKey: mockApiKey });

    const result = await isApiKeyConfigured();

    expect(result).toBe(true);
  });

  it('deve retornar false quando API key não está configurada', async () => {
    mockStorageSync.get.mockResolvedValue({});

    const result = await isApiKeyConfigured();

    expect(result).toBe(false);
  });

  it('deve retornar false quando há erro no storage (graceful degradation)', async () => {
    const storageError = new Error('Storage access denied');
    mockStorageSync.get.mockRejectedValue(storageError);

    const result = await isApiKeyConfigured();

    expect(result).toBe(false);
  });

  it('deve retornar false para API key vazia', async () => {
    mockStorageSync.get.mockResolvedValue({ geminiApiKey: '' });

    const result = await isApiKeyConfigured();

    expect(result).toBe(false);
  });
});

describe('Config - getExtensionConfig', () => {
  it('deve retornar configuração completa quando disponível', async () => {
    const mockConfig = {
      geminiApiKey: 'AIzaSyDwCoDRQOLqayAXFGCdsWZKxmXBcxJv31Y',
      lastUpdated: 1642678800000,
    };
    mockStorageSync.get.mockResolvedValue(mockConfig);

    const result = await getExtensionConfig();

    expect(result).toEqual(mockConfig);
    expect(mockStorageSync.get).toHaveBeenCalledWith(['geminiApiKey', 'lastUpdated']);
  });

  it('deve retornar configuração vazia quando não há dados', async () => {
    mockStorageSync.get.mockResolvedValue({});

    const result = await getExtensionConfig();

    expect(result).toEqual({
      geminiApiKey: undefined,
      lastUpdated: undefined,
    });
  });

  it('deve lançar StorageError quando há erro no storage', async () => {
    const storageError = new Error('Storage access denied');
    mockStorageSync.get.mockRejectedValue(storageError);

    await expect(getExtensionConfig()).rejects.toThrow(StorageError);
  });
});

describe('Config - Integração', () => {
  const validApiKey = 'AIzaSyDwCoDRQOLqayAXFGCdsWZKxmXBcxJv31Y';

  it('deve executar fluxo completo: set -> get -> clear', async () => {
    // Mock para simular storage persistente
    let storageData: any = {};
    
    mockStorageSync.set.mockImplementation((data) => {
      Object.assign(storageData, data);
      return Promise.resolve();
    });
    
    mockStorageSync.get.mockImplementation((keys) => {
      const result: any = {};
      keys.forEach((key: string) => {
        if (storageData[key] !== undefined) {
          result[key] = storageData[key];
        }
      });
      return Promise.resolve(result);
    });
    
    mockStorageSync.remove.mockImplementation((keys) => {
      keys.forEach((key: string) => {
        delete storageData[key];
      });
      return Promise.resolve();
    });

    // 1. Inicialmente não deve estar configurada
    expect(await isApiKeyConfigured()).toBe(false);

    // 2. Salvar API key
    await setGeminiApiKey(validApiKey);
    expect(await isApiKeyConfigured()).toBe(true);
    expect(await getGeminiApiKey()).toBe(validApiKey);

    // 3. Verificar configuração completa
    const config = await getExtensionConfig();
    expect(config.geminiApiKey).toBe(validApiKey);
    expect(config.lastUpdated).toBeGreaterThan(0);

    // 4. Limpar API key
    await clearGeminiApiKey();
    expect(await isApiKeyConfigured()).toBe(false);
    expect(await getGeminiApiKey()).toBeNull();
  });
});
