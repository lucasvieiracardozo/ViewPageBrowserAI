// src/background/config.ts

import { 
  ApiKeyError, 
  StorageError, 
  ValidationError,
  ErrorFactory, 
  ErrorLogger, 
  withErrorHandling,
  withTimeout 
} from '../utils/errors';

/**
 * Configuração segura para a extensão
 * A API key agora é armazenada no chrome.storage.sync de forma segura
 */

export interface ExtensionConfig {
  geminiApiKey?: string;
  lastUpdated?: number;
}

/**
 * Valida o formato da API key do Google Gemini
 * @param apiKey - A API key para validar
 * @throws {ValidationError} Se a API key for inválida
 */
function validateApiKey(apiKey: string): void {
  if (!apiKey || typeof apiKey !== 'string') {
    throw ErrorFactory.validationFailure('apiKey', apiKey, 'API key deve ser uma string não vazia');
  }
  
  const trimmedKey = apiKey.trim();
  if (trimmedKey.length === 0) {
    throw ErrorFactory.validationFailure('apiKey', apiKey, 'API key não pode estar vazia');
  }
  
  if (!trimmedKey.startsWith('AIza')) {
    throw ErrorFactory.invalidApiKey(trimmedKey);
  }
  
  if (trimmedKey.length < 35) {
    throw ErrorFactory.invalidApiKey(trimmedKey);
  }
}

/**
 * Obtém a API key do Gemini do storage seguro
 * @returns Promise com a API key ou null se não configurada
 * @throws {StorageError} Se houver erro ao acessar o storage
 */
export async function getGeminiApiKey(): Promise<string | null> {
  return withErrorHandling(
    async () => {
      return withTimeout(
        async () => {
          const result = await chrome.storage.sync.get(['geminiApiKey']);
          return result.geminiApiKey || null;
        },
        5000,
        'getGeminiApiKey'
      );
    },
    (error) => ErrorFactory.storageFailure('get', error)
  );
}

/**
 * Salva a API key do Gemini no storage seguro
 * @param apiKey - A API key para salvar
 * @throws {ValidationError} Se a API key for inválida
 * @throws {StorageError} Se houver erro ao salvar no storage
 */
export async function setGeminiApiKey(apiKey: string): Promise<void> {
  // Valida a API key antes de salvar
  validateApiKey(apiKey);
  
  await withErrorHandling(
    async () => {
      return withTimeout(
        async () => {
          await chrome.storage.sync.set({
            geminiApiKey: apiKey.trim(),
            lastUpdated: Date.now()
          });
        },
        5000,
        'setGeminiApiKey'
      );
    },
    (error) => ErrorFactory.storageFailure('set', error)
  );
}

/**
 * Remove a API key do storage
 * @throws {StorageError} Se houver erro ao remover do storage
 */
export async function clearGeminiApiKey(): Promise<void> {
  await withErrorHandling(
    async () => {
      return withTimeout(
        async () => {
          await chrome.storage.sync.remove(['geminiApiKey', 'lastUpdated']);
        },
        5000,
        'clearGeminiApiKey'
      );
    },
    (error) => ErrorFactory.storageFailure('remove', error)
  );
}

/**
 * Verifica se a API key está configurada
 * @returns Promise<boolean> - true se a API key está configurada
 * @throws {StorageError} Se houver erro ao acessar o storage
 */
export async function isApiKeyConfigured(): Promise<boolean> {
  try {
    const apiKey = await getGeminiApiKey();
    return apiKey !== null && apiKey.length > 0;
  } catch (error) {
    // Se houver erro ao acessar storage, assumimos que não está configurada
    ErrorLogger.log(error as any);
    return false;
  }
}

/**
 * Obtém configurações completas da extensão
 * @returns Promise<ExtensionConfig> - Configurações da extensão
 * @throws {StorageError} Se houver erro ao acessar o storage
 */
export async function getExtensionConfig(): Promise<ExtensionConfig> {
  return withErrorHandling(
    async () => {
      return withTimeout(
        async () => {
          const result = await chrome.storage.sync.get(['geminiApiKey', 'lastUpdated']);
          return {
            geminiApiKey: result.geminiApiKey || undefined,
            lastUpdated: result.lastUpdated || undefined
          };
        },
        5000,
        'getExtensionConfig'
      );
    },
    (error) => ErrorFactory.storageFailure('get', error)
  );
}