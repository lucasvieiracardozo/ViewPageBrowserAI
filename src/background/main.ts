// src/background/main.ts - VERSÃO COM SAUDAÇÃO SUTIL

import { GoogleGenerativeAI, Content, Part } from "@google/generative-ai";
import { GEMINI_API_KEY } from "./config";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "open_chat") {
    await chrome.storage.local.clear();
    await chrome.action.openPopup();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "START_MULTIMODAL_CHAT") {
    const runChatInitialization = async () => {
      try {
        const { screenshotDataUrl, pageContext } = request;
        const distillationPrompt = `Sua tarefa é agir como um 'olho de IA' e transcrever a informação visível de uma página web. Analise a IMAGEM e o CÓDIGO HTML. Crie um documento de texto estruturado descrevendo o conteúdo. NÃO RESUMA. TRANSCREVA os dados importantes (títulos, visualizações, etc.). CONTEXTO HTML: Título: "${pageContext.title}", Conteúdo: "${pageContext.htmlContent.substring(0, 8000)}"`;
        const imagePart: Part = { inlineData: { mimeType: 'image/jpeg', data: screenshotDataUrl.split(',')[1] } };
        const distillationResult = await model.generateContent([distillationPrompt, imagePart]);
        const distilledContext = await distillationResult.response.text();
        await chrome.storage.local.set({ distilledContext });

        // --- O PROMPT DE SAUDAÇÃO FINAL E SUTIL ---
        const openingPrompt = `
          Você é um copiloto de IA com a personalidade de um colega de trabalho amigável.
          Sua tarefa é criar uma saudação, NÃO um resumo.
          Baseado no "documento de briefing" de uma página, escreva uma única frase de abertura curta e casual que apenas mostre que você entendeu o TEMA GERAL da página.

          REGRAS IMPORTANTES:
          1. **NÃO revele dados específicos** como números, estatísticas ou detalhes do título na sua primeira fala.
          2. Seja um observador, não um vendedor. Exemplo: "Opa, vendo um vídeo sobre Uber, hein?" ou "Interessante esse artigo sobre o mercado financeiro.".
          3. Termine de forma aberta, convidando para a conversa.

          DOCUMENTO DE BRIEFING: "${distilledContext.substring(0, 1500)}"
        `;
        
        const openingResult = await model.generateContent(openingPrompt);
        const initialMessage: Message = { role: 'model', text: openingResult.response.text() };

        sendResponse(initialMessage);
        await chrome.storage.local.set({
          activeConversation: { url: sender.tab?.url, history: [initialMessage] }
        });

      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        sendResponse({ error: `Erro ao analisar a página: ${errorMessage}` });
      }
    };
    runChatInitialization();
    return true;
  } 
  
  else if (request.type === "SEND_CHAT_MESSAGE") {
    const runContinueChat = async () => {
      try {
        const currentHistory: Message[] = request.history;
        const data = await chrome.storage.local.get('distilledContext');
        if (!data.distilledContext) throw new Error("Contexto destilado não encontrado.");

        const promptForGenerativeModel: Content[] = [
          { role: "user", parts: [{ text: `INSTRUÇÕES DE PERSONA: Sua única fonte de conhecimento é o "DOCUMENTO DE CONTEXTO" abaixo. NUNCA mencione o "documento". Responda diretamente. Se a resposta não estiver no documento, diga "Hmm, essa informação não está aqui nesta página.". Use sempre formatação Markdown. DOCUMENTO DE CONTEXTO: """${data.distilledContext}""" --- HISTÓRICO DA CONVERSA:` }] },
          ...currentHistory.map(msg => ({ role: msg.role as 'user' | 'model', parts: [{ text: msg.text }] }))
        ];
        
        const result = await model.generateContent({ contents: promptForGenerativeModel });
        const newAIMessage: Message = { role: 'model', text: result.response.text() };
        
        sendResponse({ text: newAIMessage.text });

        const updatedHistory = [...currentHistory, newAIMessage];
        const currentConversation = await chrome.storage.local.get("activeConversation");
        await chrome.storage.local.set({
          activeConversation: { ...currentConversation.activeConversation, history: updatedHistory }
        });
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
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