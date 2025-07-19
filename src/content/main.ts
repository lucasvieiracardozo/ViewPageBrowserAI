// src/content/main.ts - VERSÃO FINAL COM "FOTÓGRAFO PACIENTE" (MutationObserver)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_PAGE_CONTEXT") {
    console.log("Content script: Recebi pedido da UI. Aguardando conteúdo dinâmico...");

    const extractContent = () => {
      const mainContentElement = 
        document.querySelector('main') || 
        document.querySelector('article') || 
        document.querySelector('[role="main"]') ||
        // Seletor específico para o grid de resultados do YouTube
        document.querySelector('ytd-two-column-browse-results-renderer') ||
        document.body;

      const bodyClone = mainContentElement.cloneNode(true) as HTMLElement;
      bodyClone.querySelectorAll('script, style, svg, noscript, nav, footer, aside, #secondary').forEach(el => el.remove());

      return {
        title: document.title,
        htmlContent: bodyClone.innerHTML,
        textContent: bodyClone.innerText,
      };
    };

    // Tenta encontrar o container do conteúdo principal do YouTube
    const contentContainer = document.querySelector('ytd-rich-grid-renderer');

    // Se o container existir e estiver vazio (esperando conteúdo), nós observamos ele
    if (contentContainer && contentContainer.children.length === 0) {
      const observer = new MutationObserver((mutations, obs) => {
        // Assim que o container for modificado (os vídeos forem adicionados)...
        if (contentContainer.children.length > 0) {
          console.log("Conteúdo dinâmico carregado! Extraindo...");
          sendResponse(extractContent());
          obs.disconnect(); // Para de observar
          return;
        }
      });

      observer.observe(contentContainer, {
        childList: true,
        subtree: true,
      });

      // Timeout de segurança: se nada acontecer em 5 segundos, extrai o que tiver
      setTimeout(() => {
        console.log("Timeout do observer. Extraindo o que estiver disponível.");
        observer.disconnect();
        // Verifica se a resposta ainda não foi enviada
        try {
          sendResponse(extractContent());
        } catch (e) {
          // Se a resposta já foi enviada, o catch evita um erro no console.
        }
      }, 5000);

    } else {
      // Se a página for estática ou o conteúdo já estiver lá, extrai imediatamente
      console.log("Página estática ou conteúdo já presente. Extraindo imediatamente...");
      sendResponse(extractContent());
    }

    return true; // Mantém a porta aberta para a resposta assíncrona do observer/timeout
  }
});

console.log("Content script (v5 - Fotógrafo Paciente) ativo.");