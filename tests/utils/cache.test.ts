// tests/utils/cache.test.ts - Testes simplificados para sistema de cache

import {
  IntelligentCache
} from '../../src/utils/cache';

// Mock do Chrome APIs
const mockChromeStorage = {
  local: {
    get: jest.fn().mockResolvedValue({}),
    set: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn().mockResolvedValue(undefined),
    clear: jest.fn().mockResolvedValue(undefined)
  }
};

global.chrome = {
  storage: mockChromeStorage
} as any;

// Mock do ErrorLogger e ErrorFactory
jest.mock('../../src/utils/errors', () => ({
  ErrorLogger: {
    log: jest.fn()
  },
  ErrorFactory: {
    storageFailure: jest.fn((operation, message) => ({ operation, message })),
    validationFailure: jest.fn((type, data, message) => ({ type, data, message }))
  },
  withErrorHandling: jest.fn().mockImplementation(async (fn) => {
    return await fn();
  })
}));

describe('IntelligentCache', () => {
  let cache: IntelligentCache<string>;

  beforeEach(() => {
    jest.clearAllMocks();
    cache = new IntelligentCache<string>({
      maxSize: 1000,
      maxItems: 10,
      defaultTtl: 60000
    });
  });

  afterEach(() => {
    if (cache && typeof cache.destroy === 'function') {
      cache.destroy();
    }
  });

  describe('Basic Cache Operations', () => {
    it('should store and retrieve items', async () => {
      await cache.set('key1', 'value1');
      const result = await cache.get('key1');
      
      expect(result).toBe('value1');
    });

    it('should return null for non-existent keys', async () => {
      const result = await cache.get('non-existent');
      expect(result).toBeNull();
    });

    it('should clear all items', async () => {
      await cache.set('key1', 'value1');
      await cache.set('key2', 'value2');
      
      await cache.clear();
      
      expect(await cache.get('key1')).toBeNull();
      expect(await cache.get('key2')).toBeNull();
    });
  });

  describe('Cache Configuration', () => {
    it('should create cache with different configurations', () => {
      const smallCache = new IntelligentCache<string>({
        maxSize: 100,
        maxItems: 5,
        defaultTtl: 30000
      });

      expect(smallCache).toBeDefined();
      
      if (typeof smallCache.destroy === 'function') {
        smallCache.destroy();
      }
    });

    it('should handle cache operations', async () => {
      const testCache = new IntelligentCache<string>({
        maxSize: 500,
        maxItems: 3,
        defaultTtl: 10000
      });

      await testCache.set('test1', 'value1');
      await testCache.set('test2', 'value2');
      
      expect(await testCache.get('test1')).toBe('value1');
      expect(await testCache.get('test2')).toBe('value2');
      
      if (typeof testCache.destroy === 'function') {
        testCache.destroy();
      }
    });
  });

  describe('Storage Integration', () => {
    it('should handle storage operations gracefully', async () => {
      mockChromeStorage.local.set.mockResolvedValue(undefined);
      
      await cache.set('key1', 'value1');
      
      // Verifica que não houve erro
      expect(await cache.get('key1')).toBe('value1');
    });

    it('should handle storage errors gracefully', async () => {
      mockChromeStorage.local.set.mockRejectedValue(new Error('Storage error'));
      
      // Não deve lançar erro
      await expect(cache.set('key1', 'value1')).resolves.not.toThrow();
    });
  });

  describe('Statistics', () => {
    it('should provide basic statistics', async () => {
      await cache.set('key1', 'value1');
      await cache.set('key2', 'value2');
      
      const stats = cache.getStats();
      
      expect(stats).toBeDefined();
      expect(typeof stats.size).toBe('number');
      expect(typeof stats.memoryUsage).toBe('number');
    });
  });
});

describe('Error Handling', () => {
  it('should handle cache initialization errors gracefully', () => {
    mockChromeStorage.local.get.mockRejectedValue(new Error('Init error'));
    
    expect(() => {
      new IntelligentCache<string>({
        maxSize: 1000,
        maxItems: 10,
        defaultTtl: 60000
      });
    }).not.toThrow();
  });

  it('should handle operation errors gracefully', async () => {
    const errorCache = new IntelligentCache<string>({
      maxSize: 1000,
      maxItems: 10,
      defaultTtl: 60000
    });

    // Testa que operações não quebram mesmo com erros
    await expect(errorCache.set('key1', 'value1')).resolves.not.toThrow();
    await expect(errorCache.get('key1')).resolves.not.toThrow();
    
    if (typeof errorCache.destroy === 'function') {
      errorCache.destroy();
    }
  });
});
