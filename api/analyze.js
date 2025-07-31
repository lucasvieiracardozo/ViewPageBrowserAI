// api/analyze.js
export default async function handler(req, res) {
    // CORS headers para permitir requisições da extensão
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const { message, pageContent, url } = req.body;
  
      // Validação básica
      if (!message || !pageContent) {
        return res.status(400).json({ error: 'Message and pageContent are required' });
      }
  
      // Rate limiting simples por IP (opcional para MVP)
      const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log(`Request from IP: ${clientIP}`);
  
      // Preparar prompt para Gemini
      const prompt = `
  Você é um assistente inteligente que analisa páginas web. 
  
  CONTEXTO DA PÁGINA:
  - URL: ${url}
  - Título: ${pageContent.title}
  - Descrição: ${pageContent.description}
  - Conteúdo: ${pageContent.content?.substring(0, 3000)}
  
  PERGUNTA DO USUÁRIO: ${message}
  
  Responda de forma clara e útil baseado no conteúdo da página. Se a pergunta não estiver relacionada ao conteúdo da página, explique educadamente e ofereça ajuda com o que está disponível na página.
  `;
  
      // Chamar API Gemini
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          })
        }
      );
  
      if (!geminiResponse.ok) {
        console.error('Gemini API error:', await geminiResponse.text());
        throw new Error('Failed to get response from Gemini API');
      }
  
      const geminiData = await geminiResponse.json();
      const response = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'Desculpe, não consegui processar sua solicitação.';
  
      // Log para debugging (remover em produção)
      console.log('Request processed successfully');
  
      return res.status(200).json({
        response: response,
        timestamp: new Date().toISOString()
      });
  
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({
        error: 'Internal server error',
        message: 'Algo deu errado. Tente novamente em alguns instantes.'
      });
    }
  }
  