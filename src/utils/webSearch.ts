// src/utils/webSearch.ts - Sistema de Pesquisa Web Inteligente

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  displayUrl: string;
  position: number;
}

export interface WebSearchResponse {
  query: string;
  results: SearchResult[];
  totalResults: number;
  searchTime: number;
  source: 'google' | 'bing' | 'serpapi';
}

export interface SearchOptions {
  maxResults?: number;
  language?: string;
  region?: string;
  safeSearch?: boolean;
  timeRange?: 'day' | 'week' | 'month' | 'year';
}

/**
 * Detecta se uma resposta da IA indica necessidade de pesquisa web
 */
export function needsWebSearch(aiResponse: string, userQuestion: string): boolean {
  const needsSearchIndicators = [
    'não está aqui nesta página',
    'não consigo encontrar',
    'não está visível',
    'preciso de mais informações',
    'não tenho informações sobre',
    'não está disponível na página',
    'precisa pesquisar',
    'informação não está presente',
    'não posso ver',
    'não está mostrado'
  ];

  const responseText = aiResponse.toLowerCase();
  const questionText = userQuestion.toLowerCase();

  // Verifica se a resposta indica falta de informação
  const hasNeedsIndicator = needsSearchIndicators.some(indicator => 
    responseText.includes(indicator)
  );

  // Verifica se a pergunta é sobre algo específico que pode precisar de busca
  const isSpecificQuestion = [
    'como', 'quando', 'onde', 'por que', 'quem', 'qual',
    'preço', 'valor', 'custo', 'data', 'horário',
    'contato', 'telefone', 'endereço', 'email',
    'novidades', 'notícias', 'atualização'
  ].some(keyword => questionText.includes(keyword));

  return hasNeedsIndicator || (isSpecificQuestion && responseText.length < 200);
}

/**
 * Extrai termos de busca relevantes do contexto e pergunta do usuário
 */
export function extractSearchQuery(userQuestion: string, pageContext: string, pageUrl?: string): string {
  // Limpar e normalizar a pergunta
  let query = userQuestion.trim();
  
  // Remover palavras de parada comuns
  const stopWords = [
    'o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das',
    'em', 'no', 'na', 'nos', 'nas', 'para', 'por', 'com', 'sem',
    'que', 'qual', 'quais', 'como', 'quando', 'onde', 'por que', 'porque',
    'me', 'te', 'se', 'nos', 'vos', 'lhe', 'lhes',
    'este', 'esta', 'estes', 'estas', 'esse', 'essa', 'esses', 'essas',
    'aquele', 'aquela', 'aqueles', 'aquelas'
  ];

  // Extrair entidades importantes do contexto da página
  const pageEntities = extractEntitiesFromContext(pageContext);
  
  // Adicionar contexto relevante da página à busca
  if (pageEntities.length > 0) {
    const mainEntity = pageEntities[0];
    if (!query.toLowerCase().includes(mainEntity.toLowerCase())) {
      query = `${mainEntity} ${query}`;
    }
  }

  // Adicionar domínio se relevante
  if (pageUrl) {
    const domain = new URL(pageUrl).hostname.replace('www.', '');
    const siteName = domain.split('.')[0];
    
    // Adicionar site se for relevante para a busca
    if (['youtube', 'amazon', 'mercadolivre', 'olx', 'linkedin'].includes(siteName)) {
      query = `site:${domain} ${query}`;
    }
  }

  return query.trim();
}

/**
 * Extrai entidades importantes do contexto da página
 */
function extractEntitiesFromContext(context: string): string[] {
  const entities: string[] = [];
  
  // Extrair títulos e cabeçalhos (geralmente são entidades importantes)
  const titleMatches = context.match(/H[1-6]: ([^\\n]+)/g);
  if (titleMatches) {
    titleMatches.forEach(match => {
      const title = match.replace(/H[1-6]: /, '').trim();
      if (title.length > 3 && title.length < 100) {
        entities.push(title);
      }
    });
  }

  // Extrair nomes próprios (palavras capitalizadas)
  const properNouns = context.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g);
  if (properNouns) {
    properNouns.forEach(noun => {
      if (noun.length > 3 && noun.length < 50 && !entities.includes(noun)) {
        entities.push(noun);
      }
    });
  }

  return entities.slice(0, 3); // Retornar apenas as 3 mais relevantes
}

/**
 * Realiza pesquisa usando Google Custom Search API
 */
async function searchGoogle(query: string, options: SearchOptions = {}): Promise<WebSearchResponse> {
  const startTime = Date.now();
  
  // Configurações da API (você precisará configurar essas chaves)
  const API_KEY = await getGoogleSearchApiKey();
  const SEARCH_ENGINE_ID = await getGoogleSearchEngineId();
  
  if (!API_KEY || !SEARCH_ENGINE_ID) {
    throw new Error('Google Search API não configurada');
  }

  const params = new URLSearchParams({
    key: API_KEY,
    cx: SEARCH_ENGINE_ID,
    q: query,
    num: Math.min(options.maxResults || 5, 10).toString(),
    safe: options.safeSearch ? 'active' : 'off',
    lr: options.language || 'lang_pt',
    gl: options.region || 'br'
  });

  if (options.timeRange) {
    const timeMap = {
      'day': 'd1',
      'week': 'w1', 
      'month': 'm1',
      'year': 'y1'
    };
    params.append('dateRestrict', timeMap[options.timeRange]);
  }

  const response = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`);
  
  if (!response.ok) {
    throw new Error(`Google Search API error: ${response.status}`);
  }

  const data = await response.json();
  
  const results: SearchResult[] = (data.items || []).map((item: any, index: number) => ({
    title: item.title,
    url: item.link,
    snippet: item.snippet,
    displayUrl: item.displayLink,
    position: index + 1
  }));

  return {
    query,
    results,
    totalResults: parseInt(data.searchInformation?.totalResults || '0'),
    searchTime: Date.now() - startTime,
    source: 'google'
  };
}

/**
 * Realiza pesquisa usando SerpAPI (alternativa mais simples)
 */
async function searchSerpAPI(query: string, options: SearchOptions = {}): Promise<WebSearchResponse> {
  const startTime = Date.now();
  
  const API_KEY = await getSerpApiKey();
  if (!API_KEY) {
    throw new Error('SerpAPI não configurada');
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    engine: 'google',
    q: query,
    num: Math.min(options.maxResults || 5, 10).toString(),
    hl: options.language || 'pt',
    gl: options.region || 'br',
    safe: options.safeSearch ? 'active' : 'off'
  });

  const response = await fetch(`https://serpapi.com/search?${params}`);
  
  if (!response.ok) {
    throw new Error(`SerpAPI error: ${response.status}`);
  }

  const data = await response.json();
  
  const results: SearchResult[] = (data.organic_results || []).map((item: any, index: number) => ({
    title: item.title,
    url: item.link,
    snippet: item.snippet,
    displayUrl: item.displayed_link,
    position: index + 1
  }));

  return {
    query,
    results,
    totalResults: data.search_information?.total_results || 0,
    searchTime: Date.now() - startTime,
    source: 'serpapi'
  };
}

/**
 * Função principal de pesquisa web com fallback
 */
export async function performWebSearch(
  query: string, 
  options: SearchOptions = {}
): Promise<WebSearchResponse> {
  console.log(`[WebSearch] Pesquisando: "${query}"`);
  
  try {
    // Tentar SerpAPI primeiro (mais simples de configurar)
    return await searchSerpAPI(query, options);
  } catch (serpError) {
    console.warn('[WebSearch] SerpAPI falhou, tentando Google:', serpError);
    
    try {
      // Fallback para Google Custom Search
      return await searchGoogle(query, options);
    } catch (googleError) {
      console.error('[WebSearch] Todas as APIs falharam:', { serpError, googleError });
      throw new Error('Pesquisa web indisponível no momento');
    }
  }
}

/**
 * Combina resultados de pesquisa com contexto da página
 */
export function combineSearchWithPageContext(
  pageContext: string,
  searchResults: WebSearchResponse,
  userQuestion: string
): string {
  const searchSummary = searchResults.results
    .slice(0, 3) // Usar apenas os 3 primeiros resultados
    .map(result => `**${result.title}**\n${result.snippet}\nFonte: ${result.displayUrl}`)
    .join('\n\n');

  return `CONTEXTO DA PÁGINA ATUAL:
${pageContext}

INFORMAÇÕES ADICIONAIS DA WEB (pesquisa: "${searchResults.query}"):
${searchSummary}

PERGUNTA DO USUÁRIO: ${userQuestion}

Use tanto o contexto da página quanto as informações da web para fornecer uma resposta completa e útil.`;
}

// Funções para obter chaves de API (implementar conforme necessário)
async function getGoogleSearchApiKey(): Promise<string | null> {
  const result = await chrome.storage.local.get('googleSearchApiKey');
  return result.googleSearchApiKey || null;
}

async function getGoogleSearchEngineId(): Promise<string | null> {
  const result = await chrome.storage.local.get('googleSearchEngineId');
  return result.googleSearchEngineId || null;
}

async function getSerpApiKey(): Promise<string | null> {
  const result = await chrome.storage.local.get('serpApiKey');
  return result.serpApiKey || null;
}

/**
 * Função utilitária para testar se as APIs estão configuradas
 */
export async function checkWebSearchAvailability(): Promise<{
  serpapi: boolean;
  google: boolean;
  available: boolean;
}> {
  const serpApiKey = await getSerpApiKey();
  const googleApiKey = await getGoogleSearchApiKey();
  const googleEngineId = await getGoogleSearchEngineId();

  const serpapi = !!serpApiKey;
  const google = !!(googleApiKey && googleEngineId);

  return {
    serpapi,
    google,
    available: serpapi || google
  };
}
