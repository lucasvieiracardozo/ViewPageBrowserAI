// src/utils/cache.ts - Sistema de cache inteligente para performance

import { ErrorFactory, ErrorLogger, withErrorHandling } from './errors';

/**
 * Interface para itens do cache
 */
export interface CacheItem<T = any> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live em ms
  accessCount: number;
  lastAccessed: number;
  size?: number; // Tamanho estimado em bytes
}

/**
 * Configurações do cache
 */
export interface CacheConfig {
  maxSize: number; // Tamanho máximo em bytes
  maxItems: number; // Número máximo de itens
  defaultTtl: number; // TTL padrão em ms
  cleanupInterval: number; // Intervalo de limpeza em ms
}

/**
 * Estratégias de eviction do cache
 */
export enum EvictionStrategy {
  LRU = 'lru', // Least Recently Used
  LFU = 'lfu', // Least Frequently Used
  TTL = 'ttl', // Time To Live
}

/**
 * Sistema de cache inteligente com múltiplas estratégias
 */
export class IntelligentCache<T = any> {
  private cache = new Map<string, CacheItem<T>>();
  private config: CacheConfig;
  private cleanupTimer?: NodeJS.Timeout;
  private currentSize = 0;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      maxSize: 10 * 1024 * 1024, // 10MB
      maxItems: 1000,
      defaultTtl: 30 * 60 * 1000, // 30 minutos
      cleanupInterval: 5 * 60 * 1000, // 5 minutos
      ...config,
    };

    this.startCleanupTimer();
  }

  /**
   * Adiciona item ao cache
   */
  async set(key: string, data: T, ttl?: number): Promise<void> {
    return await withErrorHandling(
      async () => {
        const now = Date.now();
        const itemTtl = ttl || this.config.defaultTtl;
        const size = this.estimateSize(data);

        // Remove item existente se houver
        if (this.cache.has(key)) {
          this.remove(key);
        }

        // Verifica se precisa fazer eviction
        await this.ensureSpace(size);

        const item: CacheItem<T> = {
          data,
          timestamp: now,
          ttl: itemTtl,
          accessCount: 0,
          lastAccessed: now,
          size,
        };

        this.cache.set(key, item);
        this.currentSize += size;

        // Persiste no storage se necessário
        await this.persistToStorage(key, item);
      },
      (error) => ErrorFactory.storageFailure('cache_set', error)
    );
  }

  /**
   * Recupera item do cache
   */
  async get(key: string): Promise<T | null> {
    return withErrorHandling(
      async () => {
        let item = this.cache.get(key);

        // Se não está na memória, tenta carregar do storage
        if (!item) {
          const storageItem = await this.loadFromStorage(key);
          if (storageItem) {
            item = storageItem;
            this.cache.set(key, item);
            this.currentSize += item.size || 0;
          }
        }

        if (!item) {
          return null;
        }

        // Verifica se expirou
        const now = Date.now();
        if (now - item.timestamp > item.ttl) {
          this.remove(key);
          return null;
        }

        // Atualiza estatísticas de acesso
        item.accessCount++;
        item.lastAccessed = now;

        return item.data;
      },
      (error) => ErrorFactory.storageFailure('cache_get', error.message || 'Cache get failed')
    );
  }

  /**
   * Remove item do cache
   */
  remove(key: string): boolean {
    const item = this.cache.get(key);
    if (item) {
      this.cache.delete(key);
      this.currentSize -= item.size || 0;
      this.removeFromStorage(key);
      return true;
    }
    return false;
  }

  /**
   * Limpa todo o cache
   */
  async clear(): Promise<void> {
    this.cache.clear();
    this.currentSize = 0;
    await this.clearStorage();
  }

  /**
   * Verifica se item existe e não expirou
   */
  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      this.remove(key);
      return false;
    }

    return true;
  }

  /**
   * Obtém estatísticas do cache
   */
  getStats(): {
    size: number;
    itemCount: number;
    hitRate: number;
    memoryUsage: number;
    oldestItem: number;
    newestItem: number;
  } {
    const items = Array.from(this.cache.values());
    const totalAccess = items.reduce((sum, item) => sum + item.accessCount, 0);
    const totalPossibleAccess = items.length * Math.max(...items.map(i => i.accessCount), 1);

    return {
      size: this.currentSize,
      itemCount: this.cache.size,
      hitRate: totalPossibleAccess > 0 ? totalAccess / totalPossibleAccess : 0,
      memoryUsage: this.currentSize / this.config.maxSize,
      oldestItem: Math.min(...items.map(i => i.timestamp), Date.now()),
      newestItem: Math.max(...items.map(i => i.timestamp), 0),
    };
  }

  /**
   * Força limpeza do cache
   */
  cleanup(): void {
    const now = Date.now();
    const keysToRemove: string[] = [];

    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => this.remove(key));
  }

  /**
   * Garante que há espaço suficiente no cache
   */
  private async ensureSpace(requiredSize: number): Promise<void> {
    // Se já tem espaço, não faz nada
    if (this.currentSize + requiredSize <= this.config.maxSize && 
        this.cache.size < this.config.maxItems) {
      return;
    }

    // Executa estratégias de eviction
    await this.evictItems(requiredSize);
  }

  /**
   * Remove itens usando estratégias de eviction
   */
  private async evictItems(requiredSize: number): Promise<void> {
    const items = Array.from(this.cache.entries());
    
    // Ordena por estratégia LRU (menos recentemente usado)
    items.sort(([, a], [, b]) => a.lastAccessed - b.lastAccessed);

    let freedSpace = 0;
    for (const [key] of items) {
      if (freedSpace >= requiredSize && this.cache.size < this.config.maxItems) {
        break;
      }

      const item = this.cache.get(key);
      if (item) {
        freedSpace += item.size || 0;
        this.remove(key);
      }
    }
  }

  /**
   * Estima o tamanho de um objeto em bytes
   */
  private estimateSize(data: T): number {
    try {
      return new Blob([JSON.stringify(data)]).size;
    } catch {
      // Fallback para estimativa simples
      return JSON.stringify(data).length * 2; // UTF-16
    }
  }

  /**
   * Persiste item no storage
   */
  private async persistToStorage(key: string, item: CacheItem<T>): Promise<void> {
    try {
      const storageKey = `cache_${key}`;
      await chrome.storage.local.set({ [storageKey]: item });
    } catch (error) {
      // Falha silenciosa - cache funciona apenas na memória
      ErrorLogger.log(ErrorFactory.storageFailure('cache_persist', error));
    }
  }

  /**
   * Carrega item do storage
   */
  private async loadFromStorage(key: string): Promise<CacheItem<T> | null> {
    try {
      const storageKey = `cache_${key}`;
      const result = await chrome.storage.local.get([storageKey]);
      return result[storageKey] || null;
    } catch (error) {
      ErrorLogger.log(ErrorFactory.storageFailure('cache_load', error));
      return null;
    }
  }

  /**
   * Remove item do storage
   */
  private async removeFromStorage(key: string): Promise<void> {
    try {
      const storageKey = `cache_${key}`;
      await chrome.storage.local.remove([storageKey]);
    } catch (error) {
      // Falha silenciosa
      ErrorLogger.log(ErrorFactory.storageFailure('cache_remove', error));
    }
  }

  /**
   * Limpa todo o storage do cache
   */
  private async clearStorage(): Promise<void> {
    try {
      const result = await chrome.storage.local.get(null);
      const cacheKeys = Object.keys(result).filter(key => key.startsWith('cache_'));
      if (cacheKeys.length > 0) {
        await chrome.storage.local.remove(cacheKeys);
      }
    } catch (error) {
      ErrorLogger.log(ErrorFactory.storageFailure('cache_clear', error));
    }
  }

  /**
   * Inicia timer de limpeza automática
   */
  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  /**
   * Para timer de limpeza
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
  }
}

/**
 * Cache específico para respostas da IA
 */
export class AIResponseCache extends IntelligentCache<{
  response: string;
  context: string;
  model: string;
}> {
  constructor() {
    super({
      maxSize: 5 * 1024 * 1024, // 5MB para respostas da IA
      maxItems: 100,
      defaultTtl: 60 * 60 * 1000, // 1 hora
    });
  }

  /**
   * Gera chave de cache baseada no contexto e prompt
   */
  generateKey(context: string, prompt: string): string {
    const combined = `${context}_${prompt}`;
    return this.hashString(combined);
  }

  /**
   * Hash simples para gerar chaves
   */
  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }
}

/**
 * Cache para contextos de página
 */
export class PageContextCache extends IntelligentCache<{
  title: string;
  content: string;
  url: string;
  timestamp: number;
}> {
  constructor() {
    super({
      maxSize: 2 * 1024 * 1024, // 2MB para contextos
      maxItems: 50,
      defaultTtl: 10 * 60 * 1000, // 10 minutos
    });
  }

  /**
   * Gera chave baseada na URL e hash do conteúdo
   */
  generateKey(url: string, contentHash: string): string {
    return `${url}_${contentHash}`;
  }
}

// Instâncias globais dos caches
export const aiResponseCache = new AIResponseCache();
export const pageContextCache = new PageContextCache();
