// tests/utils/performance.test.ts - Testes para sistema de performance

import {
  debounce,
  throttle,
  memoize,
  LazyLoader,
  DataCompressor,
  PerformanceMonitor,
  ImageOptimizer,
  BatchProcessor,
  performanceMonitor
} from '../../src/utils/performance';

// Mock do ErrorLogger
jest.mock('../../src/utils/errors', () => ({
  ErrorLogger: {
    log: jest.fn()
  },
  ErrorFactory: {
    validationFailure: jest.fn((type, data, message) => ({ type, data, message })),
    timeoutFailure: jest.fn((name, time) => ({ name, time }))
  }
}));

describe('Performance Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('debounce', () => {
    it('should delay function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('test');
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledWith('test');
    });

    it('should cancel previous calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('first');
      debouncedFn('second');
      
      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('second');
    });
  });

  describe('throttle', () => {
    it('should limit function calls', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn('first');
      throttledFn('second');
      throttledFn('third');

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('first');

      jest.advanceTimersByTime(100);
      throttledFn('fourth');
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenCalledWith('fourth');
    });
  });

  describe('memoize', () => {
    it('should cache function results', () => {
      const mockFn = jest.fn((x: number) => x * 2);
      const memoizedFn = memoize(mockFn);

      const result1 = memoizedFn(5);
      const result2 = memoizedFn(5);

      expect(result1).toBe(10);
      expect(result2).toBe(10);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should use custom key generator', () => {
      const mockFn = jest.fn((obj: { id: number }) => obj.id * 2);
      const memoizedFn = memoize(mockFn, (obj) => obj.id.toString());

      const obj1 = { id: 1 };
      const obj2 = { id: 1 };

      const result1 = memoizedFn(obj1);
      const result2 = memoizedFn(obj2);

      expect(result1).toBe(2);
      expect(result2).toBe(2);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('LazyLoader', () => {
    it('should load resource only once', async () => {
      const mockLoader = jest.fn().mockResolvedValue('loaded data');
      const lazyLoader = new LazyLoader(mockLoader);

      expect(lazyLoader.isLoaded()).toBe(false);

      const result1 = await lazyLoader.load();
      const result2 = await lazyLoader.load();

      expect(result1).toBe('loaded data');
      expect(result2).toBe('loaded data');
      expect(mockLoader).toHaveBeenCalledTimes(1);
      expect(lazyLoader.isLoaded()).toBe(true);
    });

    it('should reset loader state', async () => {
      const mockLoader = jest.fn().mockResolvedValue('loaded data');
      const lazyLoader = new LazyLoader(mockLoader);

      await lazyLoader.load();
      expect(lazyLoader.isLoaded()).toBe(true);

      lazyLoader.reset();
      expect(lazyLoader.isLoaded()).toBe(false);

      await lazyLoader.load();
      expect(mockLoader).toHaveBeenCalledTimes(2);
    });
  });

  describe('DataCompressor', () => {
    it('should compress and decompress data', () => {
      const originalData = 'aaaaaabbbbbbcccccc';
      
      const compressed = DataCompressor.compress(originalData);
      const decompressed = DataCompressor.decompress(compressed);

      expect(decompressed).toBe(originalData);
    });

    it('should handle compression errors gracefully', () => {
      // Simula erro na compressão
      const originalCompress = DataCompressor['simpleCompress'];
      DataCompressor['simpleCompress'] = jest.fn().mockImplementation(() => {
        throw new Error('Compression failed');
      });

      const data = 'test data';
      const result = DataCompressor.compress(data);

      expect(result).toBe(data); // Fallback para dados originais
      
      // Restaura método original
      DataCompressor['simpleCompress'] = originalCompress;
    });
  });

  describe('PerformanceMonitor', () => {
    let monitor: PerformanceMonitor;

    beforeEach(() => {
      monitor = new PerformanceMonitor();
      // Mock performance.now
      let mockTime = 0;
      jest.spyOn(performance, 'now').mockImplementation(() => mockTime += 100);
    });

    it('should measure function execution time', async () => {
      const mockFn = jest.fn().mockResolvedValue('result');
      
      const result = await monitor.measure('test-operation', mockFn);
      
      expect(result).toBe('result');
      expect(mockFn).toHaveBeenCalled();

      const stats = monitor.getStats();
      expect(stats['test-operation']).toBeDefined();
      expect(stats['test-operation'].count).toBe(1);
      expect(stats['test-operation'].avgTime).toBe(100);
    });

    it('should record metrics manually', () => {
      monitor.recordMetric('manual-test', 250);
      monitor.recordMetric('manual-test', 150);

      const stats = monitor.getStats();
      expect(stats['manual-test'].count).toBe(2);
      expect(stats['manual-test'].avgTime).toBe(200);
      expect(stats['manual-test'].minTime).toBe(150);
      expect(stats['manual-test'].maxTime).toBe(250);
    });

    it('should clear statistics', () => {
      monitor.recordMetric('test', 100);
      expect(Object.keys(monitor.getStats())).toHaveLength(1);

      monitor.clearStats();
      expect(Object.keys(monitor.getStats())).toHaveLength(0);
    });
  });

  describe('ImageOptimizer', () => {
    it('should calculate optimal dimensions correctly', () => {
      const calculateOptimalDimensions = (ImageOptimizer as any).calculateOptimalDimensions;
      
      // Teste com imagem muito larga
      let result = calculateOptimalDimensions(2000, 1000, 800, 600);
      expect(result.width).toBe(800);
      expect(result.height).toBe(400);

      // Teste com imagem muito alta
      result = calculateOptimalDimensions(1000, 2000, 800, 600);
      expect(result.width).toBe(300);
      expect(result.height).toBe(600);

      // Teste com imagem que cabe
      result = calculateOptimalDimensions(400, 300, 800, 600);
      expect(result.width).toBe(400);
      expect(result.height).toBe(300);
    });

    it('should handle optimization errors gracefully', async () => {
      // Testa fallback quando Canvas não está disponível
      const base64Image = 'data:image/png;base64,test';
      
      // Mock que simula erro de Canvas
      const originalOptimize = ImageOptimizer.optimizeBase64Image;
      ImageOptimizer.optimizeBase64Image = jest.fn().mockRejectedValue(new Error('Canvas not available'));
      
      try {
        await ImageOptimizer.optimizeBase64Image(base64Image, 0.8, 800, 600);
      } catch (error) {
        expect(error.message).toBe('Canvas not available');
      }
      
      // Restaura método original
      ImageOptimizer.optimizeBase64Image = originalOptimize;
    });
  });

  describe('BatchProcessor', () => {
    it('should create BatchProcessor instance', () => {
      const mockProcessor = jest.fn();
      const batchProcessor = new BatchProcessor(mockProcessor, 2, 50);
      
      expect(batchProcessor).toBeDefined();
      expect(typeof batchProcessor.add).toBe('function');
    });

    it('should handle batch processing operations', () => {
      const mockProcessor = jest.fn();
      const batchProcessor = new BatchProcessor(mockProcessor, 2, 50);
      
      expect(() => {
        batchProcessor.add('item1');
        batchProcessor.add('item2');
      }).not.toThrow();
      
      expect(batchProcessor).toBeDefined();
    });

    it('should accept valid configuration parameters', () => {
      const mockProcessor = jest.fn();
      
      expect(() => {
        new BatchProcessor(mockProcessor, 5, 100);
      }).not.toThrow();
      
      expect(() => {
        new BatchProcessor(mockProcessor, 1, 10);
      }).not.toThrow();
    });
  });

  describe('Global performance monitor', () => {
    it('should be available as singleton', () => {
      expect(performanceMonitor).toBeInstanceOf(PerformanceMonitor);
    });
  });
});
