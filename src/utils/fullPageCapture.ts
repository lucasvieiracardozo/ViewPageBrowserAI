// src/utils/fullPageCapture.ts - Sistema de Captura de Página Completa

export interface PageDimensions {
  width: number;
  height: number;
  viewportWidth: number;
  viewportHeight: number;
  scrollWidth: number;
  scrollHeight: number;
}

export interface FullPageCaptureResult {
  screenshot: string; // Base64 data URL da imagem completa
  dimensions: PageDimensions;
  htmlContext: string;
  textContext: string;
  title: string;
  url: string;
  captureTime: number;
  segments: number; // Quantos segmentos foram capturados
}

export interface CaptureOptions {
  maxHeight?: number; // Altura máxima em pixels (padrão: 8000)
  quality?: number; // Qualidade JPEG (padrão: 70)
  format?: 'jpeg' | 'png'; // Formato da imagem (padrão: jpeg)
  waitTime?: number; // Tempo de espera entre capturas em ms (padrão: 500)
  includeHiddenElements?: boolean; // Incluir elementos ocultos (padrão: false)
}

/**
 * Captura as dimensões completas da página
 */
export async function getPageDimensions(tabId: number): Promise<PageDimensions> {
  const results = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      return {
        width: Math.max(
          document.body.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.clientWidth,
          document.documentElement.scrollWidth,
          document.documentElement.offsetWidth
        ),
        height: Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        ),
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight
      };
    }
  });

  if (!results[0]?.result) {
    throw new Error('Falha ao obter dimensões da página');
  }
  return results[0].result;
}

/**
 * Captura página completa usando abordagem mais simples e rápida
 * Minimiza o tempo de scroll para reduzir impacto visual
 */
async function captureFullPageWithoutScroll(
  tabId: number,
  windowId: number,
  options: CaptureOptions
): Promise<string[]> {
  // 1. Salvar posição atual do usuário
  const originalPosition = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => ({ x: window.scrollX, y: window.scrollY })
  });
  
  const originalScroll = originalPosition[0]?.result || { x: 0, y: 0 };
  
  // 2. Obter dimensões da página
  const dimensions = await getPageDimensions(tabId);
  
  // 3. Calcular segmentos
  const maxHeight = options.maxHeight || 8000;
  const effectiveHeight = Math.min(dimensions.height, maxHeight);
  const viewportHeight = dimensions.viewportHeight;
  const segmentCount = Math.ceil(effectiveHeight / viewportHeight);
  
  console.log(`[FullPageCapture] Capturando ${segmentCount} segmentos rapidamente...`);
  
  const screenshots: string[] = [];
  
  // 4. Capturar cada segmento respeitando rate limits do Chrome
  for (let i = 0; i < segmentCount; i++) {
    const yPosition = i * viewportHeight;
    
    // Scroll instantâneo para a posição
    await chrome.scripting.executeScript({
      target: { tabId },
      func: (y: number) => {
        window.scrollTo({
          top: y,
          left: 0,
          behavior: 'instant' as ScrollBehavior
        });
      },
      args: [yPosition]
    });
    
    // Aguardar renderização + rate limit (aumentado para evitar quota)
    const waitTime = Math.max(200, options.waitTime || 200);
    await new Promise(resolve => setTimeout(resolve, waitTime));
    
    try {
      // Capturar screenshot com retry em caso de rate limit
      const screenshot = await chrome.tabs.captureVisibleTab(windowId, {
        format: options.format || 'jpeg',
        quality: options.quality || 70
      });
      
      if (!screenshot) {
        throw new Error(`Screenshot vazio para segmento ${i + 1}`);
      }
      
      screenshots.push(screenshot);
      console.log(`[FullPageCapture] Segmento ${i + 1}/${segmentCount} capturado`);
      
    } catch (error: any) {
      if (error?.message?.includes('quota') || error?.message?.includes('rate')) {
        console.warn(`[FullPageCapture] Rate limit atingido, aguardando 1s...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Retry uma vez
        try {
          const screenshot = await chrome.tabs.captureVisibleTab(windowId, {
            format: options.format || 'jpeg',
            quality: options.quality || 70
          });
          
          if (!screenshot) {
            throw new Error(`Screenshot vazio para segmento ${i + 1} (retry)`);
          }
          
          screenshots.push(screenshot);
          console.log(`[FullPageCapture] Segmento ${i + 1}/${segmentCount} capturado (retry)`);
        } catch (retryError: any) {
          console.error(`[FullPageCapture] Falha no retry do segmento ${i + 1}:`, retryError);
          throw new Error(`Falha na captura do segmento ${i + 1}: ${retryError}`);
        }
      } else {
        console.error(`[FullPageCapture] Erro no segmento ${i + 1}:`, error);
        throw error;
      }
    }
  }
  
  // 5. Restaurar posição original IMEDIATAMENTE
  await chrome.scripting.executeScript({
    target: { tabId },
    func: (pos: { x: number, y: number }) => {
      window.scrollTo({
        top: pos.y,
        left: pos.x,
        behavior: 'instant' as ScrollBehavior
      });
    },
    args: [originalScroll]
  });
  
  console.log('[FullPageCapture] Posição original restaurada');
  
  return screenshots;
}

/**
 * Une múltiplos screenshots usando OffscreenCanvas (funciona em background)
 */
async function stitchScreenshots(
  screenshots: string[], 
  dimensions: PageDimensions,
  viewportHeight: number
): Promise<string> {
  // Usar OffscreenCanvas para funcionar em background script
  const canvas = new OffscreenCanvas(
    dimensions.viewportWidth,
    Math.min(dimensions.height, screenshots.length * viewportHeight)
  );
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Não foi possível criar contexto do OffscreenCanvas');
  }

  // Carregar e desenhar todas as imagens
  for (let i = 0; i < screenshots.length; i++) {
    const screenshot = screenshots[i];
    const yPosition = i * viewportHeight;
    
    // Converter base64 para ImageBitmap
    const response = await fetch(screenshot);
    const blob = await response.blob();
    const imageBitmap = await createImageBitmap(blob);
    
    // Desenhar no canvas
    ctx.drawImage(imageBitmap, 0, yPosition);
    
    // Limpar memória
    imageBitmap.close();
  }
  
  // Converter para blob e depois para data URL
  const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.8 });
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Erro ao converter blob para data URL'));
    reader.readAsDataURL(blob);
  });
}

/**
 * Extrai contexto HTML e texto da página completa
 */
async function extractFullPageContext(tabId: number): Promise<{htmlContext: string, textContext: string, title: string}> {
  const results = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      // Função para extrair conteúdo relevante
      const extractContent = () => {
        // Priorizar elementos principais de conteúdo
        const mainContentElement = 
          document.querySelector('main') || 
          document.querySelector('article') || 
          document.querySelector('[role="main"]') ||
          document.querySelector('.content') ||
          document.querySelector('#content') ||
          document.querySelector('ytd-two-column-browse-results-renderer') || // YouTube
          document.body;

        const bodyClone = mainContentElement.cloneNode(true) as HTMLElement;
        
        // Remover elementos desnecessários
        const elementsToRemove = [
          'script', 'style', 'svg', 'noscript', 'nav', 'footer', 
          'aside', '#secondary', '.ads', '.advertisement', 
          '[data-ad]', '.sidebar', '.menu'
        ];
        
        elementsToRemove.forEach(selector => {
          bodyClone.querySelectorAll(selector).forEach(el => el.remove());
        });

        // Extrair texto de elementos importantes
        const importantSelectors = [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'p', 'article', 'section',
          '.title', '.heading', '.description',
          '[data-testid*="title"]', '[data-testid*="description"]'
        ];

        let structuredText = '';
        importantSelectors.forEach(selector => {
          const elements = bodyClone.querySelectorAll(selector);
          elements.forEach(el => {
            const text = el.textContent?.trim();
            if (text && text.length > 10) {
              structuredText += `${selector.toUpperCase()}: ${text}\n`;
            }
          });
        });

        return {
          title: document.title,
          htmlContent: bodyClone.innerHTML,
          textContent: bodyClone.innerText,
          structuredText: structuredText,
          url: window.location.href
        };
      };

      return extractContent();
    }
  });

  if (!results[0]?.result) {
    throw new Error('Falha ao extrair contexto da página');
  }
  
  const result = results[0].result;
  return {
    htmlContext: result.htmlContent,
    textContext: result.structuredText || result.textContent,
    title: result.title
  };
}

/**
 * Função principal para capturar página completa SEM scroll visível
 */
export async function captureFullPage(
  tabId: number, 
  windowId: number, 
  options: CaptureOptions = {}
): Promise<FullPageCaptureResult> {
  const startTime = Date.now();
  
  try {
    // 1. Obter dimensões da página
    console.log('[FullPageCapture] Obtendo dimensões da página...');
    const dimensions = await getPageDimensions(tabId);
    
    // 2. Calcular quantos segmentos precisamos
    const maxHeight = options.maxHeight || 8000;
    const effectiveHeight = Math.min(dimensions.height, maxHeight);
    const viewportHeight = dimensions.viewportHeight;
    const segmentCount = Math.ceil(effectiveHeight / viewportHeight);
    
    console.log(`[FullPageCapture] Página: ${dimensions.width}x${dimensions.height}px`);
    console.log(`[FullPageCapture] Capturando ${segmentCount} segmentos SEM scroll visível...`);
    
    // 3. Capturar todos os segmentos sem afetar o usuário
    const screenshots = await captureFullPageWithoutScroll(tabId, windowId, options);
    
    // 4. Unir screenshots
    console.log('[FullPageCapture] Unindo screenshots...');
    const fullScreenshot = await stitchScreenshots(screenshots, dimensions, viewportHeight);
    
    // 5. Extrair contexto da página
    console.log('[FullPageCapture] Extraindo contexto...');
    const context = await extractFullPageContext(tabId);
    
    const result: FullPageCaptureResult = {
      screenshot: fullScreenshot,
      dimensions,
      htmlContext: context.htmlContext,
      textContext: context.textContext,
      title: context.title,
      url: (await chrome.tabs.get(tabId)).url || '',
      captureTime: Date.now() - startTime,
      segments: segmentCount
    };
    
    console.log(`[FullPageCapture] Captura completa em ${result.captureTime}ms SEM afetar o usuário`);
    return result;
    
  } catch (error) {
    console.error('[FullPageCapture] Erro durante captura:', error);
    throw new Error(`Falha na captura de página completa: ${error}`);
  }
}

/**
 * Função utilitária para comprimir screenshot se necessário
 */
export function compressScreenshot(dataUrl: string, maxSizeKB: number = 1024): string {
  // Se a imagem for menor que o limite, retorna como está
  const sizeKB = (dataUrl.length * 3/4) / 1024; // Aproximação do tamanho em KB
  
  if (sizeKB <= maxSizeKB) {
    return dataUrl;
  }
  
  // Criar canvas para recompressão
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  return new Promise<string>((resolve) => {
    img.onload = () => {
      // Reduzir qualidade progressivamente até atingir o tamanho desejado
      let quality = 0.8;
      let compressed = dataUrl;
      
      while (quality > 0.1) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        compressed = canvas.toDataURL('image/jpeg', quality);
        
        const newSizeKB = (compressed.length * 3/4) / 1024;
        if (newSizeKB <= maxSizeKB) {
          break;
        }
        
        quality -= 0.1;
      }
      
      resolve(compressed);
    };
    
    img.src = dataUrl;
  }) as any; // Type assertion para compatibilidade
}
