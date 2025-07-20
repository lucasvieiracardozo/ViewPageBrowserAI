// tests/utils/errors.test.ts - Testes para o sistema de tratamento de erros

import {
  ExtensionError,
  ApiKeyError,
  GeminiApiError,
  StorageError,
  PageCaptureError,
  ValidationError,
  TimeoutError,
  ErrorFactory,
  ErrorLogger,
  withErrorHandling,
  withTimeout,
} from '../../src/utils/errors';

describe('ExtensionError Classes', () => {
  describe('ApiKeyError', () => {
    it('deve criar erro com propriedades corretas', () => {
      const error = new ApiKeyError(
        'API key is invalid',
        'Chave de API inválida',
        { keyPrefix: 'AIza1234' }
      );

      expect(error.code).toBe('API_KEY_ERROR');
      expect(error.message).toBe('API key is invalid');
      expect(error.userMessage).toBe('Chave de API inválida');
      expect(error.context).toEqual({ keyPrefix: 'AIza1234' });
      expect(error.timestamp).toBeGreaterThan(0);
      expect(error.name).toBe('ApiKeyError');
    });

    it('deve ser serializável para JSON', () => {
      const error = new ApiKeyError('Test error', 'Erro de teste');
      const json = error.toJSON();

      expect(json).toMatchObject({
        name: 'ApiKeyError',
        code: 'API_KEY_ERROR',
        message: 'Test error',
        userMessage: 'Erro de teste',
        timestamp: expect.any(Number),
      });
    });
  });

  describe('GeminiApiError', () => {
    it('deve incluir status code quando fornecido', () => {
      const error = new GeminiApiError(
        'Rate limit exceeded',
        'Muitas requisições',
        429,
        { endpoint: '/generate' }
      );

      expect(error.code).toBe('GEMINI_API_ERROR');
      expect(error.statusCode).toBe(429);
      expect(error.context).toEqual({ endpoint: '/generate', statusCode: 429 });
    });
  });

  describe('TimeoutError', () => {
    it('deve incluir timeout em ms no contexto', () => {
      const error = new TimeoutError(
        'Operation timed out',
        'Operação demorou muito',
        5000,
        { operation: 'fetchData' }
      );

      expect(error.code).toBe('TIMEOUT_ERROR');
      expect(error.timeoutMs).toBe(5000);
      expect(error.context).toEqual({ operation: 'fetchData', timeoutMs: 5000 });
    });
  });

  describe('ValidationError', () => {
    it('deve incluir campo no contexto', () => {
      const error = new ValidationError(
        'Invalid email format',
        'Formato de email inválido',
        'email',
        { value: 'invalid-email' }
      );

      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.field).toBe('email');
      expect(error.context).toEqual({ value: 'invalid-email', field: 'email' });
    });
  });
});

describe('ErrorFactory', () => {
  describe('apiKeyNotConfigured', () => {
    it('deve criar ApiKeyError para chave não configurada', () => {
      const error = ErrorFactory.apiKeyNotConfigured();

      expect(error).toBeInstanceOf(ApiKeyError);
      expect(error.code).toBe('API_KEY_ERROR');
      expect(error.userMessage).toContain('não configurada');
      expect(error.context?.action).toBe('configure_api_key');
    });
  });

  describe('invalidApiKey', () => {
    it('deve criar ApiKeyError para chave inválida', () => {
      const invalidKey = 'invalid-key-123';
      const error = ErrorFactory.invalidApiKey(invalidKey);

      expect(error).toBeInstanceOf(ApiKeyError);
      expect(error.userMessage).toContain('inválido');
      expect(error.context?.keyPrefix).toBe('invalid-');
    });
  });

  describe('geminiApiFailure', () => {
    it('deve criar GeminiApiError com mensagem específica para status 429', () => {
      const error = ErrorFactory.geminiApiFailure(new Error('Rate limited'), 429);

      expect(error).toBeInstanceOf(GeminiApiError);
      expect(error.statusCode).toBe(429);
      expect(error.userMessage).toContain('Muitas requisições');
    });

    it('deve criar GeminiApiError com mensagem específica para status 401', () => {
      const error = ErrorFactory.geminiApiFailure(new Error('Unauthorized'), 401);

      expect(error.statusCode).toBe(401);
      expect(error.userMessage).toContain('API key inválida');
    });

    it('deve criar GeminiApiError com mensagem específica para status 403', () => {
      const error = ErrorFactory.geminiApiFailure(new Error('Forbidden'), 403);

      expect(error.statusCode).toBe(403);
      expect(error.userMessage).toContain('Acesso negado');
    });

    it('deve usar mensagem genérica para outros status codes', () => {
      const error = ErrorFactory.geminiApiFailure(new Error('Server error'), 500);

      expect(error.statusCode).toBe(500);
      expect(error.userMessage).toContain('Erro ao comunicar com a IA');
    });
  });

  describe('storageFailure', () => {
    it('deve criar StorageError com operação específica', () => {
      const originalError = new Error('Quota exceeded');
      const error = ErrorFactory.storageFailure('set', originalError);

      expect(error).toBeInstanceOf(StorageError);
      expect(error.message).toContain('Storage set failed');
      expect(error.context?.operation).toBe('set');
      expect(error.context?.originalError).toBe(originalError);
    });
  });

  describe('timeoutFailure', () => {
    it('deve criar TimeoutError com detalhes da operação', () => {
      const error = ErrorFactory.timeoutFailure('apiCall', 5000);

      expect(error).toBeInstanceOf(TimeoutError);
      expect(error.timeoutMs).toBe(5000);
      expect(error.context?.operation).toBe('apiCall');
    });
  });
});

describe('ErrorLogger', () => {
  beforeEach(() => {
    ErrorLogger.clearLogs();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('deve registrar erros no log', () => {
    const error = new ApiKeyError('Test error', 'Erro de teste');
    
    ErrorLogger.log(error);
    
    const logs = ErrorLogger.getLogs();
    expect(logs).toHaveLength(1);
    expect(logs[0].error).toBe(error);
    expect(logs[0].timestamp).toBeGreaterThan(0);
  });

  it('deve limitar o número de logs', () => {
    // Simula mais logs do que o limite
    for (let i = 0; i < 150; i++) {
      const error = new ApiKeyError(`Error ${i}`, `Erro ${i}`);
      ErrorLogger.log(error);
    }

    const logs = ErrorLogger.getLogs();
    expect(logs).toHaveLength(100); // MAX_LOGS
  });

  it('deve gerar estatísticas corretas', () => {
    ErrorLogger.log(new ApiKeyError('Error 1', 'Erro 1'));
    ErrorLogger.log(new ApiKeyError('Error 2', 'Erro 2'));
    ErrorLogger.log(new StorageError('Error 3', 'Erro 3'));

    const stats = ErrorLogger.getStats();
    expect(stats).toEqual({
      'API_KEY_ERROR': 2,
      'STORAGE_ERROR': 1,
    });
  });

  it('deve limpar logs corretamente', () => {
    ErrorLogger.log(new ApiKeyError('Test error', 'Erro de teste'));
    expect(ErrorLogger.getLogs()).toHaveLength(1);

    ErrorLogger.clearLogs();
    expect(ErrorLogger.getLogs()).toHaveLength(0);
  });

  it('deve logar no console durante desenvolvimento', () => {
    const error = new ApiKeyError('Test error', 'Erro de teste');
    
    ErrorLogger.log(error);
    
    expect(console.error).toHaveBeenCalledWith(
      '[API_KEY_ERROR] Test error',
      expect.objectContaining({
        userMessage: 'Erro de teste',
        context: undefined,
        stack: expect.any(String),
      })
    );
  });
});

describe('withErrorHandling', () => {
  it('deve retornar resultado quando operação é bem-sucedida', async () => {
    const operation = jest.fn().mockResolvedValue('success');
    const errorFactory = jest.fn();

    const result = await withErrorHandling(operation, errorFactory);

    expect(result).toBe('success');
    expect(operation).toHaveBeenCalled();
    expect(errorFactory).not.toHaveBeenCalled();
  });

  it('deve capturar e transformar erros', async () => {
    const originalError = new Error('Original error');
    const operation = jest.fn().mockRejectedValue(originalError);
    const transformedError = new ApiKeyError('Transformed error', 'Erro transformado');
    const errorFactory = jest.fn().mockReturnValue(transformedError);

    await expect(withErrorHandling(operation, errorFactory)).rejects.toBe(transformedError);
    
    expect(operation).toHaveBeenCalled();
    expect(errorFactory).toHaveBeenCalledWith(originalError);
  });

  it('deve registrar erros no ErrorLogger', async () => {
    jest.spyOn(ErrorLogger, 'log').mockImplementation(() => {});
    
    const originalError = new Error('Original error');
    const operation = jest.fn().mockRejectedValue(originalError);
    const transformedError = new ApiKeyError('Transformed error', 'Erro transformado');
    const errorFactory = jest.fn().mockReturnValue(transformedError);

    await expect(withErrorHandling(operation, errorFactory)).rejects.toBe(transformedError);
    
    expect(ErrorLogger.log).toHaveBeenCalledWith(transformedError);
  });
});

describe('withTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve retornar resultado quando operação completa dentro do timeout', async () => {
    const operation = jest.fn().mockResolvedValue('success');

    const promise = withTimeout(operation, 5000, 'testOperation');
    
    // Avança o tempo, mas não o suficiente para timeout
    jest.advanceTimersByTime(1000);
    
    const result = await promise;
    expect(result).toBe('success');
  });

  it('deve lançar TimeoutError quando operação demora muito', async () => {
    const operation = jest.fn().mockImplementation(() => new Promise(() => {})); // Never resolves

    const promise = withTimeout(operation, 5000, 'testOperation');
    
    // Avança o tempo além do timeout
    jest.advanceTimersByTime(6000);
    
    await expect(promise).rejects.toThrow(TimeoutError);
  });

  it('deve propagar erros da operação quando ela falha antes do timeout', async () => {
    const originalError = new Error('Operation failed');
    const operation = jest.fn().mockRejectedValue(originalError);

    const promise = withTimeout(operation, 5000, 'testOperation');
    
    await expect(promise).rejects.toBe(originalError);
  });

  it('deve limpar timer quando operação completa', async () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    const operation = jest.fn().mockResolvedValue('success');

    await withTimeout(operation, 5000, 'testOperation');
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
