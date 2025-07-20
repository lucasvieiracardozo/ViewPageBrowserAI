// src/utils/performance.ts - Sistema de otimizações de performance

import { ErrorFactory, ErrorLogger, withErrorHandling } from './errors';

/**
 * Debounce function para limitar chamadas frequentes
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle function para limitar taxa de execução
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Memoização para funções puras
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  getKey?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = getKey ? getKey(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Lazy loading para recursos pesados
 */
export class LazyLoader<T> {
  private loader: () => Promise<T>;
  private promise: Promise<T> | null = null;
  private result: T | null = null;

  constructor(loader: () => Promise<T>) {
    this.loader = loader;
  }

  async load(): Promise<T> {
    if (this.result) {
      return this.result;
    }

    if (!this.promise) {
      this.promise = this.loader();
    }

    this.result = await this.promise;
    return this.result;
  }

  isLoaded(): boolean {
    return this.result !== null;
  }

  reset(): void {
    this.promise = null;
    this.result = null;
  }
}

/**
 * Pool de workers para processamento paralelo
 */
export class WorkerPool {
  private workers: Worker[] = [];
  private availableWorkers: Worker[] = [];
  private taskQueue: Array<{
    task: any;
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }> = [];

  constructor(workerScript: string, poolSize: number = 4) {
    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker(workerScript);
      this.workers.push(worker);
      this.availableWorkers.push(worker);
    }
  }

  async execute<T>(task: any): Promise<T> {
    return new Promise((resolve, reject) => {
      this.taskQueue.push({ task, resolve, reject });
      this.processQueue();
    });
  }

  private processQueue(): void {
    if (this.taskQueue.length === 0 || this.availableWorkers.length === 0) {
      return;
    }

    const worker = this.availableWorkers.pop()!;
    const { task, resolve, reject } = this.taskQueue.shift()!;

    const handleMessage = (event: MessageEvent) => {
      worker.removeEventListener('message', handleMessage);
      worker.removeEventListener('error', handleError);
      this.availableWorkers.push(worker);
      resolve(event.data);
      this.processQueue();
    };

    const handleError = (error: ErrorEvent) => {
      worker.removeEventListener('message', handleMessage);
      worker.removeEventListener('error', handleError);
      this.availableWorkers.push(worker);
      reject(error);
      this.processQueue();
    };

    worker.addEventListener('message', handleMessage);
    worker.addEventListener('error', handleError);
    worker.postMessage(task);
  }

  destroy(): void {
    this.workers.forEach(worker => worker.terminate());
    this.workers = [];
    this.availableWorkers = [];
    this.taskQueue = [];
  }
}

/**
 * Compressão de dados para reduzir uso de memória
 */
export class DataCompressor {
  /**
   * Comprime string usando algoritmo simples
   */
  static compress(data: string): string {
    try {
      // Usa compressão simples baseada em repetições
      return this.simpleCompress(data);
    } catch (error) {
      ErrorLogger.log(ErrorFactory.validationFailure('compression', data, 'Failed to compress'));
      return data; // Fallback para dados não comprimidos
    }
  }

  /**
   * Descomprime string
   */
  static decompress(compressedData: string): string {
    try {
      return this.simpleDecompress(compressedData);
    } catch (error) {
      ErrorLogger.log(ErrorFactory.validationFailure('decompression', compressedData, 'Failed to decompress'));
      return compressedData; // Fallback
    }
  }

  /**
   * Compressão simples para fallback
   */
  private static simpleCompress(data: string): string {
    const result: string[] = [];
    let i = 0;
    
    while (i < data.length) {
      let count = 1;
      const char = data[i];
      
      while (i + count < data.length && data[i + count] === char && count < 255) {
        count++;
      }
      
      if (count > 3) {
        result.push(`${count}${char}`);
      } else {
        result.push(char.repeat(count));
      }
      
      i += count;
    }
    
    return result.join('');
  }

  /**
   * Descompressão simples
   */
  private static simpleDecompress(data: string): string {
    return data.replace(/(\d+)(.)/g, (match, count, char) => {
      const num = parseInt(count, 10);
      return num > 3 ? char.repeat(num) : match;
    });
  }
}

/**
 * Monitor de performance para métricas
 */
export class PerformanceMonitor {
  private metrics: Map<string, {
    count: number;
    totalTime: number;
    minTime: number;
    maxTime: number;
    lastTime: number;
  }> = new Map();

  /**
   * Mede tempo de execução de uma função
   */
  async measure<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const startTime = performance.now();
    
    try {
      const result = await fn();
      this.recordMetric(name, performance.now() - startTime);
      return result;
    } catch (error) {
      this.recordMetric(name, performance.now() - startTime, true);
      throw error;
    }
  }

  /**
   * Registra métrica manualmente
   */
  recordMetric(name: string, time: number, isError: boolean = false): void {
    const existing = this.metrics.get(name) || {
      count: 0,
      totalTime: 0,
      minTime: Infinity,
      maxTime: 0,
      lastTime: 0,
    };

    existing.count++;
    existing.totalTime += time;
    existing.minTime = Math.min(existing.minTime, time);
    existing.maxTime = Math.max(existing.maxTime, time);
    existing.lastTime = time;

    this.metrics.set(name, existing);

    // Log métricas críticas
    if (time > 5000) { // Mais de 5 segundos
      ErrorLogger.log(ErrorFactory.timeoutFailure(name, time));
    }
  }

  /**
   * Obtém estatísticas de performance
   */
  getStats(): Record<string, {
    count: number;
    avgTime: number;
    minTime: number;
    maxTime: number;
    lastTime: number;
  }> {
    const stats: Record<string, any> = {};
    
    for (const [name, metric] of this.metrics.entries()) {
      stats[name] = {
        count: metric.count,
        avgTime: metric.totalTime / metric.count,
        minTime: metric.minTime === Infinity ? 0 : metric.minTime,
        maxTime: metric.maxTime,
        lastTime: metric.lastTime,
      };
    }
    
    return stats;
  }

  /**
   * Limpa métricas antigas
   */
  clearStats(): void {
    this.metrics.clear();
  }
}

/**
 * Otimizador de imagens para reduzir tamanho
 */
export class ImageOptimizer {
  /**
   * Reduz qualidade de imagem base64
   */
  static optimizeBase64Image(
    base64Data: string, 
    quality: number = 0.7,
    maxWidth: number = 1920,
    maxHeight: number = 1080
  ): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calcula dimensões otimizadas
        let { width, height } = this.calculateOptimalDimensions(
          img.width, 
          img.height, 
          maxWidth, 
          maxHeight
        );

        canvas.width = width;
        canvas.height = height;

        // Desenha imagem redimensionada
        ctx.drawImage(img, 0, 0, width, height);

        // Converte para base64 com qualidade reduzida
        const optimizedData = canvas.toDataURL('image/jpeg', quality);
        resolve(optimizedData);
      };

      img.src = base64Data;
    });
  }

  /**
   * Calcula dimensões ótimas mantendo aspect ratio
   */
  private static calculateOptimalDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    const aspectRatio = originalWidth / originalHeight;

    let width = originalWidth;
    let height = originalHeight;

    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    return { width: Math.round(width), height: Math.round(height) };
  }
}

/**
 * Batch processor para operações em lote
 */
export class BatchProcessor<T, R> {
  private batchSize: number;
  private delay: number;
  private processor: (batch: T[]) => Promise<R[]>;
  private queue: T[] = [];
  private processing = false;

  constructor(
    processor: (batch: T[]) => Promise<R[]>,
    batchSize: number = 10,
    delay: number = 100
  ) {
    this.processor = processor;
    this.batchSize = batchSize;
    this.delay = delay;
  }

  async add(item: T): Promise<R> {
    return new Promise((resolve, reject) => {
      this.queue.push(item);
      
      // Adiciona resolver para este item específico
      const itemIndex = this.queue.length - 1;
      
      setTimeout(async () => {
        if (!this.processing) {
          try {
            const results = await this.processBatch();
            resolve(results[itemIndex]);
          } catch (error) {
            reject(error);
          }
        }
      }, this.delay);
    });
  }

  private async processBatch(): Promise<R[]> {
    if (this.processing || this.queue.length === 0) {
      return [];
    }

    this.processing = true;
    const batch = this.queue.splice(0, this.batchSize);
    
    try {
      const results = await this.processor(batch);
      return results;
    } finally {
      this.processing = false;
      
      // Processa próximo batch se houver itens na fila
      if (this.queue.length > 0) {
        setTimeout(() => this.processBatch(), this.delay);
      }
    }
  }
}

// Instâncias globais
export const performanceMonitor = new PerformanceMonitor();
