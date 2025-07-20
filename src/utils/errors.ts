// src/utils/errors.ts - Sistema de tratamento de erros personalizado

/**
 * Classe base para erros da extensão
 */
export abstract class ExtensionError extends Error {
  abstract readonly code: string;
  abstract readonly userMessage: string;
  readonly timestamp: number;
  readonly context?: Record<string, any>;

  constructor(message: string, context?: Record<string, any>) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = Date.now();
    this.context = context;
    
    // Mantém o stack trace correto
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Converte o erro para um objeto serializável
   */
  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      userMessage: this.userMessage,
      timestamp: this.timestamp,
      context: this.context,
      stack: this.stack,
    };
  }
}

/**
 * Erro relacionado à configuração da API key
 */
export class ApiKeyError extends ExtensionError {
  readonly code = 'API_KEY_ERROR';
  
  constructor(message: string, public readonly userMessage: string, context?: Record<string, any>) {
    super(message, context);
  }
}

/**
 * Erro de comunicação com a API do Gemini
 */
export class GeminiApiError extends ExtensionError {
  readonly code = 'GEMINI_API_ERROR';
  
  constructor(
    message: string, 
    public readonly userMessage: string,
    public readonly statusCode?: number,
    context?: Record<string, any>
  ) {
    super(message, { ...context, statusCode });
  }
}

/**
 * Erro de storage do Chrome
 */
export class StorageError extends ExtensionError {
  readonly code = 'STORAGE_ERROR';
  
  constructor(message: string, public readonly userMessage: string, context?: Record<string, any>) {
    super(message, context);
  }
}

/**
 * Erro de captura de página
 */
export class PageCaptureError extends ExtensionError {
  readonly code = 'PAGE_CAPTURE_ERROR';
  
  constructor(message: string, public readonly userMessage: string, context?: Record<string, any>) {
    super(message, context);
  }
}

/**
 * Erro de validação de dados
 */
export class ValidationError extends ExtensionError {
  readonly code = 'VALIDATION_ERROR';
  
  constructor(
    message: string, 
    public readonly userMessage: string,
    public readonly field?: string,
    context?: Record<string, any>
  ) {
    super(message, { ...context, field });
  }
}

/**
 * Erro de timeout
 */
export class TimeoutError extends ExtensionError {
  readonly code = 'TIMEOUT_ERROR';
  
  constructor(
    message: string, 
    public readonly userMessage: string,
    public readonly timeoutMs: number,
    context?: Record<string, any>
  ) {
    super(message, { ...context, timeoutMs });
  }
}

/**
 * Utilitário para criar erros baseados em diferentes tipos de falha
 */
export class ErrorFactory {
  static apiKeyNotConfigured(): ApiKeyError {
    return new ApiKeyError(
      'Gemini API key is not configured',
      'API key do Gemini não configurada. Por favor, configure nas opções da extensão.',
      { action: 'configure_api_key' }
    );
  }

  static invalidApiKey(key: string): ApiKeyError {
    return new ApiKeyError(
      `Invalid API key format: ${key.substring(0, 8)}...`,
      'Formato de API key inválido. Verifique se você copiou a chave corretamente.',
      { keyPrefix: key.substring(0, 8) }
    );
  }

  static geminiApiFailure(error: any, statusCode?: number): GeminiApiError {
    const message = error?.message || 'Unknown Gemini API error';
    let userMessage = 'Erro ao comunicar com a IA. Tente novamente em alguns momentos.';
    
    if (statusCode === 429) {
      userMessage = 'Muitas requisições. Aguarde um momento antes de tentar novamente.';
    } else if (statusCode === 401) {
      userMessage = 'API key inválida. Verifique sua configuração.';
    } else if (statusCode === 403) {
      userMessage = 'Acesso negado. Verifique se sua API key tem as permissões necessárias.';
    }

    return new GeminiApiError(message, userMessage, statusCode, { originalError: error });
  }

  static storageFailure(operation: string, error: any): StorageError {
    return new StorageError(
      `Storage ${operation} failed: ${error?.message || 'Unknown error'}`,
      'Erro ao acessar configurações. Tente recarregar a extensão.',
      { operation, originalError: error }
    );
  }

  static pageCaptureFailure(error: any): PageCaptureError {
    return new PageCaptureError(
      `Failed to capture page: ${error?.message || 'Unknown error'}`,
      'Não foi possível capturar a página. Verifique se a página está carregada completamente.',
      { originalError: error }
    );
  }

  static validationFailure(field: string, value: any, reason: string): ValidationError {
    return new ValidationError(
      `Validation failed for ${field}: ${reason}`,
      `Valor inválido para ${field}: ${reason}`,
      field,
      { value, reason }
    );
  }

  static timeoutFailure(operation: string, timeoutMs: number): TimeoutError {
    return new TimeoutError(
      `Operation ${operation} timed out after ${timeoutMs}ms`,
      'Operação demorou muito para responder. Tente novamente.',
      timeoutMs,
      { operation }
    );
  }
}

/**
 * Logger centralizado para erros
 */
export class ErrorLogger {
  private static readonly MAX_LOGS = 100;
  private static logs: Array<{ error: ExtensionError; timestamp: number }> = [];

  /**
   * Registra um erro no log
   */
  static log(error: ExtensionError): void {
    this.logs.push({ error, timestamp: Date.now() });
    
    // Mantém apenas os últimos MAX_LOGS
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(-this.MAX_LOGS);
    }

    // Log no console para desenvolvimento
    console.error(`[${error.code}] ${error.message}`, {
      userMessage: error.userMessage,
      context: error.context,
      stack: error.stack,
    });
  }

  /**
   * Obtém todos os logs de erro
   */
  static getLogs(): Array<{ error: ExtensionError; timestamp: number }> {
    return [...this.logs];
  }

  /**
   * Limpa todos os logs
   */
  static clearLogs(): void {
    this.logs = [];
  }

  /**
   * Obtém estatísticas dos erros
   */
  static getStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    
    this.logs.forEach(({ error }) => {
      stats[error.code] = (stats[error.code] || 0) + 1;
    });

    return stats;
  }
}

/**
 * Wrapper para operações assíncronas com tratamento de erro
 */
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  errorFactory: (error: any) => ExtensionError
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    // Se já é um ExtensionError (como TimeoutError), preserva o tipo original
    if (error instanceof ExtensionError) {
      ErrorLogger.log(error);
      throw error;
    }
    
    const extensionError = errorFactory(error);
    ErrorLogger.log(extensionError);
    throw extensionError;
  }
}

/**
 * Wrapper para operações com timeout
 */
export async function withTimeout<T>(
  operation: () => Promise<T>,
  timeoutMs: number,
  operationName: string
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const error = ErrorFactory.timeoutFailure(operationName, timeoutMs);
      ErrorLogger.log(error);
      reject(error);
    }, timeoutMs);

    operation()
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timer));
  });
}
