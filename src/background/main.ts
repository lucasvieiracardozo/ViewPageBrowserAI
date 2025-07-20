// src/background/main.ts - VERSÃO COM CACHE, PERFORMANCE E TRATAMENTO DE ERROS ROBUSTO

import { GoogleGenerativeAI, Content, Part } from "@google/generative-ai";
import { getGeminiApiKey, isApiKeyConfigured } from "./config";
import {
  GeminiApiError,
  ErrorFactory,
  ErrorLogger,
  withErrorHandling,
  withTimeout
} from "../utils/errors";
import {
  aiResponseCache,
  pageContextCache
} from "../utils/cache";
import {
  throttle,
  performanceMonitor,
  DataCompressor
} from "../utils/performance";
import { captureFullPage, FullPageCaptureResult } from "../utils/fullPageCapture";
import { 
  performWebSearch, 
  needsWebSearch, 
  extractSearchQuery, 
  combineSearchWithPageContext,
  checkWebSearchAvailability 
} from "../utils/webSearch";

// Instância global que será inicializada quando necessário
let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

// Funções auxiliares para cache e performance
const throttledAIRequest = throttle(makeAIRequest, 1000);

/**
 * Gera chave de cache baseada no conteúdo da página
 */
function generateCacheKey(url: string, content: string): string {
  const contentHash = btoa(content.substring(0, 1000)).substring(0, 32);
  return `${url}_${contentHash}`;
}

/**
 * Função genérica para fazer requisições à IA com cache e retry
 */
async function makeAIRequest(prompt: string, parts: Part[], cacheKey?: string): Promise<any> {
  return performanceMonitor.measure('ai_request', async () => {
    // Verifica cache se a chave foi fornecida
    if (cacheKey) {
      const cached = await aiResponseCache.get(cacheKey);
      if (cached) {
        console.log(`[CACHE] Cache hit for key: ${cacheKey}`);
        return { response: { text: () => cached } };
      }
    }

    // Implementa retry com timeouts progressivos
    const maxRetries = 2;
    const timeouts = [10000, 20000]; // 10s, 20s
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[AI] Tentativa ${attempt + 1}/${maxRetries + 1} - Timeout: ${timeouts[attempt] || 20000}ms`);
        
        const result = await withTimeout(
          () => model.generateContent([prompt, ...parts]),
          timeouts[attempt] || 20000,
          `ai_request_attempt_${attempt + 1}`
        );
        
        const responseText = (result as any).response.text();
        
        // Armazena no cache se a chave foi fornecida
        if (cacheKey && responseText) {
          await aiResponseCache.set(cacheKey, responseText);
          console.log(`[CACHE] Cache stored for key: ${cacheKey}`);
        }
        
        return result;
        
      } catch (error: any) {
        console.log(`[AI] Tentativa ${attempt + 1} falhou:`, error.message);
        
        // Se é a última tentativa, lança o erro
        if (attempt === maxRetries) {
          throw error;
        }
        
        // Aguarda antes da próxima tentativa
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  });
}

/**
 * Inicializa o cliente Gemini AI com a API key do storage
 * @throws {ApiKeyError} Se a API key não estiver configurada
 * @throws {StorageError} Se houver erro ao acessar o storage
 */
async function initializeGeminiAI(): Promise<void> {
  await withErrorHandling(
    async () => {
      const apiKey = await getGeminiApiKey();
      if (!apiKey) {
        throw ErrorFactory.apiKeyNotConfigured();
      }
      
      genAI = new GoogleGenerativeAI(apiKey);
      model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    },
    (error) => {
      if (error.code === 'API_KEY_ERROR' || error.code === 'STORAGE_ERROR') {
        return error;
      }
      return ErrorFactory.geminiApiFailure(error);
    }
  );
}

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "open_chat") {
    await chrome.storage.local.clear();
    await chrome.action.openPopup();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "CAPTURE_FULL_PAGE") {
    // Usar função assíncrona separada para evitar problemas de message port
    (async () => {
      try {
        console.log('[Background] Iniciando captura de página completa...');
        const fullPageResult = await captureFullPage(
          request.tabId,
          request.windowId,
          {
            maxHeight: 8000,
            quality: 70,
            format: 'jpeg',
            waitTime: 200 // Reduzido para evitar rate limit
          }
        );
        
        console.log(`[Background] Captura completa: ${fullPageResult.segments} segmentos, ${fullPageResult.captureTime}ms`);
        sendResponse(fullPageResult);
      } catch (error) {
        console.error('[Background] Erro na captura de página completa:', error);
        sendResponse({ error: `Erro na captura: ${error}` });
      }
    })();
    return true; // Manter porta aberta para resposta assíncrona
  }
  
  else if (request.type === "START_MULTIMODAL_CHAT") {
    const runChatInitialization = async () => {
      try {
        // Verifica se a API key está configurada e inicializa o modelo
        if (!model) {
          try {
            await initializeGeminiAI();
          } catch (error: any) {
            const errorMessage = error.userMessage || 'API key do Gemini não configurada. Por favor, configure nas opções da extensão.';
            sendResponse({ error: errorMessage });
            return;
          }
        }
        
        const { fullPageResult, pageContext } = request;
        
        // Validar se a captura completa foi bem-sucedida
        if (!fullPageResult || fullPageResult.error) {
          throw new Error(`Captura de página falhou: ${fullPageResult?.error || 'Resultado vazio'}`);
        }
        
        // Usar screenshot da captura completa
        const screenshotDataUrl = fullPageResult.screenshot;
        
        // Validação adicional do screenshot
        if (!screenshotDataUrl || screenshotDataUrl.length < 100) {
          throw new Error('Screenshot da página completa está vazio ou inválido');
        }
        
        console.log(`[Background] Screenshot válido recebido: ${screenshotDataUrl.length} caracteres`);
        
        // Destilação de contexto com cache inteligente
        const url = sender.tab?.url || 'unknown';
        const contextCacheKey = generateCacheKey(url, pageContext.htmlContent || '');
        
        // Verifica cache de contexto da página primeiro
        let distilledContext = await pageContextCache.get(contextCacheKey);
        
        if (!distilledContext) {
          const distillationResult = await withErrorHandling(
            async () => {
              // Usa o screenshot já capturado pelo popup
              // Validação final antes de usar com a IA
              if (!screenshotDataUrl || screenshotDataUrl.length < 100) {
                throw new Error("Screenshot da página completa não disponível ou inválido");
              }
              
              console.log(`[Background] Usando captura completa: ${fullPageResult.segments} segmentos, ${fullPageResult.captureTime}ms, ${screenshotDataUrl.length} chars`);
              
              // Prompt otimizado e mais direto
              const prompt = `Analise esta página web brevemente. Liste apenas os pontos principais: conteúdo, funcionalidades e elementos importantes. Seja conciso.`;
              
              const imagePart: Part = {
                inlineData: {
                  data: screenshotDataUrl.split(',')[1],
                  mimeType: 'image/jpeg'
                }
              };
              
              // Limita o conteúdo HTML para evitar requisições muito grandes
              const limitedHtmlContent = (pageContext.htmlContent || '').substring(0, 2000);
              
              return await makeAIRequest(prompt, [imagePart, limitedHtmlContent], `distill_${contextCacheKey}`);
            },
            (error) => ErrorFactory.geminiApiFailure(error)
          );
          
          distilledContext = await (distillationResult as any).response.text();
          
          // Armazena contexto no cache de página
          if (distilledContext) {
            await pageContextCache.set(contextCacheKey, distilledContext);
          }
        }
        
        // Garante que distilledContext não seja null
        const finalContext = distilledContext || 'Contexto não disponível';
        await chrome.storage.local.set({ distilledContext: finalContext });

        // Geração da saudação com tratamento de erro
        const openingResult = await withErrorHandling(
          async () => {
            const friendlyPrompt = `Você é um colega de trabalho experiente e amigável que acabou de passar pela mesa do usuário e viu o que ele está fazendo no navegador.

CONTEXTO COMPLETO DA PÁGINA:
Título: ${pageContext.title}
URL: ${fullPageResult?.url || 'N/A'}
Dimensões capturadas: ${fullPageResult?.dimensions?.width}x${fullPageResult?.dimensions?.height}px
Segmentos de tela: ${fullPageResult?.segments || 1}
Conteúdo: ${pageContext.textContent}

Você pode ver a página COMPLETA (não apenas o que está visível), incluindo todo o conteúdo que pode estar fora da tela. Use essa visão completa para oferecer ajuda mais precisa.

Aborde o usuário de forma natural e amigável, como se você tivesse visto o que ele está fazendo e quer ajudar. Seja proativo e útil!

Exemplos de abordagem:
- "Opa! Vi que você está no [site/conteúdo]. Posso te ajudar com alguma coisa?"
- "Interessante esse [tópico]! Tem alguma dúvida específica que eu posso esclarecer?"
- "Notei que você está pesquisando sobre [assunto]. Quer que eu complemente com algumas informações?"

Seja sempre útil e tente fornecer informações valiosas baseadas no que você vê na tela COMPLETA.`;
            
            return await withTimeout(
              () => model.generateContent(friendlyPrompt),
              15000,
              'greetingGeneration'
            );
          },
          (error) => ErrorFactory.geminiApiFailure(error)
        );
        
        const initialMessage: Message = { role: 'model', text: (openingResult as any).response.text() };

        sendResponse(initialMessage);
        
        // Salvar TANTO a conversa QUANTO o contexto completo para continuidade
        await chrome.storage.local.set({
          activeConversation: { url: sender.tab?.url, history: [initialMessage] },
          fullPageContext: fullPageResult // Salvar screenshot e metadados completos
        });
        
        console.log('[Background] Contexto completo salvo para continuidade do chat');

      } catch (error: any) {
        ErrorLogger.log(error);
        const errorMessage = error.userMessage || `Erro ao analisar a página: ${error.message}`;
        sendResponse({ error: errorMessage });
      }
    };
    runChatInitialization();
    return true;
  } 
  
  else if (request.type === "SEND_CHAT_MESSAGE") {
    const runContinueChat = async () => {
      try {
        // Verifica se a API key está configurada e inicializa o modelo
        if (!model) {
          try {
            await initializeGeminiAI();
          } catch (error: any) {
            const errorMessage = error.userMessage || 'API key do Gemini não configurada. Por favor, configure nas opções da extensão.';
            sendResponse({ error: errorMessage });
            return;
          }
        }
        
        const currentHistory: Message[] = request.history;
        
        // Recuperar TANTO o contexto destilado QUANTO o screenshot original
        const data = await chrome.storage.local.get(['distilledContext', 'fullPageContext']);
        if (!data.distilledContext) throw new Error("Contexto destilado não encontrado.");
        
        // Obter a última pergunta do usuário
        const lastUserMessage = currentHistory[currentHistory.length - 1];
        const userQuestion = lastUserMessage?.text || '';
        
        // Primeira tentativa: resposta com contexto da página
        const initialResult = await withErrorHandling(
          async () => {
            // Preparar conteúdo multimodal se screenshot estiver disponível
            const parts: Part[] = [];
            
            // Adicionar screenshot se disponível (mantém contexto visual)
            if (data.fullPageContext?.screenshot) {
              parts.push({
                inlineData: {
                  mimeType: "image/jpeg",
                  data: data.fullPageContext.screenshot.split(',')[1]
                }
              });
              console.log('[Background] Usando screenshot completo na continuação do chat');
            }
            
            // Prompt melhorado que mantém contexto visual + textual
            const contextPrompt = `Você é um colega de trabalho amigável que pode ver esta página completa.

CONTEXTO DA PÁGINA:
${data.distilledContext}

${data.fullPageContext ? `INFORMAÇÕES ADICIONAIS:
- Dimensões: ${data.fullPageContext.dimensions?.width}x${data.fullPageContext.dimensions?.height}px
- Segmentos capturados: ${data.fullPageContext.segments}
- URL: ${data.fullPageContext.url}
` : ''}
Você pode ver a página COMPLETA (incluindo partes fora da tela) e deve usar tanto a visão visual quanto o contexto textual para responder.

Se a informação não estiver visível na página, responda "PRECISO_PESQUISAR" seguido de uma explicação breve do que precisa buscar. Use formatação Markdown.

HISTÓRICO DA CONVERSA:`;
            
            parts.push({ text: contextPrompt });
            
            const promptForGenerativeModel: Content[] = [
              { role: "user", parts },
              ...currentHistory.map(msg => ({ role: msg.role as 'user' | 'model', parts: [{ text: msg.text }] }))
            ];
            
            return await withTimeout(
              () => model.generateContent({ contents: promptForGenerativeModel }),
              20000,
              'chatContinuation'
            );
          },
          (error) => ErrorFactory.geminiApiFailure(error)
        );
        
        const initialResponse = (initialResult as any).response.text();
        
        // Verificar se precisa de pesquisa web
        const needsSearch = needsWebSearch(initialResponse, userQuestion) || initialResponse.includes('PRECISO_PESQUISAR');
        
        let finalResult = initialResult;
        
        if (needsSearch) {
          console.log('[Background] IA indicou necessidade de pesquisa web');
          
          // Verificar se pesquisa web está disponível
          const searchAvailability = await checkWebSearchAvailability();
          
          if (searchAvailability.available) {
            try {
              // Extrair query de pesquisa
              const searchQuery = extractSearchQuery(
                userQuestion, 
                data.distilledContext, 
                data.fullPageContext?.url
              );
              
              console.log(`[Background] Pesquisando na web: "${searchQuery}"`);
              
              // Realizar pesquisa
              const searchResults = await performWebSearch(searchQuery, {
                maxResults: 3,
                language: 'pt',
                region: 'br'
              });
              
              // Combinar contexto da página com resultados da pesquisa
              const enhancedContext = combineSearchWithPageContext(
                data.distilledContext,
                searchResults,
                userQuestion
              );
              
              // Gerar resposta final com contexto expandido
              const enhancedResult = await withErrorHandling(
                async () => {
                  const parts: Part[] = [];
                  
                  // Adicionar screenshot se disponível
                  if (data.fullPageContext?.screenshot) {
                    parts.push({
                      inlineData: {
                        mimeType: "image/jpeg",
                        data: data.fullPageContext.screenshot.split(',')[1]
                      }
                    });
                  }
                  
                  const enhancedPrompt = `Você é um colega de trabalho expert que tem acesso tanto à página atual quanto a informações da web.

${enhancedContext}

Agora responda de forma completa e útil, combinando as informações da página com os dados da web. Seja natural e amigável, como um colega que realmente quer ajudar.

HISTÓRICO DA CONVERSA:`;
                  
                  parts.push({ text: enhancedPrompt });
                  
                  const promptForGenerativeModel: Content[] = [
                    { role: "user", parts },
                    ...currentHistory.map(msg => ({ role: msg.role as 'user' | 'model', parts: [{ text: msg.text }] }))
                  ];
                  
                  return await withTimeout(
                    () => model.generateContent({ contents: promptForGenerativeModel }),
                    25000,
                    'enhancedChatContinuation'
                  );
                },
                (error) => ErrorFactory.geminiApiFailure(error)
              );
              
              finalResult = enhancedResult;
              console.log(`[Background] Resposta gerada com pesquisa web (${searchResults.results.length} resultados)`);
              
            } catch (searchError) {
              console.error('[Background] Erro na pesquisa web:', searchError);
              // Usar resposta inicial se pesquisa falhar
              console.log('[Background] Usando resposta inicial devido a erro na pesquisa');
            }
          } else {
            console.log('[Background] Pesquisa web não disponível (APIs não configuradas)');
            // Modificar resposta inicial para informar sobre limitação
            const limitedResponse = initialResponse.replace(
              'PRECISO_PESQUISAR',
              'Hmm, essa informação não está visível nesta página. Para ter acesso a pesquisas na web, é necessário configurar uma API de busca nas configurações da extensão.'
            );
            
            finalResult = {
              response: {
                text: () => limitedResponse
              }
            };
          }
        }
        
        const result = finalResult;
        
        const newAIMessage: Message = { role: 'model', text: (result as any).response.text() };
        
        sendResponse({ text: newAIMessage.text });

        const updatedHistory = [...currentHistory, newAIMessage];
        const currentConversation = await chrome.storage.local.get("activeConversation");
        await chrome.storage.local.set({
          activeConversation: { ...currentConversation.activeConversation, history: updatedHistory }
        });
      } catch (error: any) {
        ErrorLogger.log(error);
        const errorMessage = error.userMessage || error.message;
        sendResponse({ error: errorMessage });
      }
    };
    runContinueChat();
    return true;
  }
});

interface Message {
  role: 'user' | 'model';
  text: string;
}
