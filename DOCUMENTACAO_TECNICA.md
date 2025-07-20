# Documentação Técnica: Extensão ViewPageBrowserAI

**1. Visão Geral e Arquitetura:**

ViewPageBrowserAI é uma extensão para o Google Chrome que atua como um copiloto de IA para navegação na web, utilizando a API Gemini do Google. O seu propósito é analisar o conteúdo completo de uma página web (texto e imagem) e iniciar uma conversa proativa com o usuário, oferecendo ajuda e informações contextuais. A arquitetura é baseada no Manifest V3 e desacoplada em três componentes principais: o **Background Script** (`background.js`), que funciona como o cérebro da extensão, orquestrando as chamadas à API de IA, gerenciando o estado, o cache e a comunicação entre as partes; os **Content Scripts** (`content.js`), que são injetados nas páginas web para extrair seu conteúdo (HTML, texto); e a **Interface do Usuário** (React), que renderiza o chat no popup (`index.html`) e a página de configurações (`options.html`). A comunicação entre esses componentes é assíncrona, realizada através do sistema de mensagens da API de extensões do Chrome (`chrome.runtime.sendMessage` e `chrome.runtime.onMessage`).

**2. Estrutura de Arquivos:**

```
e:/GitHub/ViewPageBrowserAI/
├── .git/
├── assets/
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
├── dist/
│   ├── background.js
│   ├── content.js
│   ├── main.js
│   └── options.js
├── node_modules/
├── public/
│   ├── index.html
│   └── options.html
├── src/
│   ├── background/
│   │   ├── config.ts
│   │   └── main.ts
│   ├── content/
│   │   └── main.ts
│   ├── ui/
│   │   ├── main.tsx
│   │   └── options.tsx
│   └── utils/
│       ├── cache.ts
│       ├── errors.ts
│       ├── fullPageCapture.ts
│       ├── performance.ts
│       └── webSearch.ts
├── .gitattributes
├── jest.config.js
├── manifest.json
├── package-lock.json
├── package.json
├── test-web-search.html
├── tsconfig.json
└── webpack.config.js
```

**3. Análise Detalhada dos Arquivos:**

### `manifest.json`
*   **Propósito:** Arquivo de configuração central da extensão. Define metadados, permissões, scripts, e pontos de entrada.
*   **Principais Funcionalidades/Lógica:**
    *   `"manifest_version": 3`: Especifica o uso do Manifest V3, a arquitetura moderna de extensões do Chrome.
    *   `"name": "ViewPageBrowserAI"`: Define o nome da extensão.
    *   `"permissions"`: Solicita acesso às APIs `storage` (para salvar configurações e conversas), `activeTab` e `scripting` (para interagir com a página ativa), e `debugger` (para a captura de página completa).
    *   `"host_permissions": ["<all_urls>"]`: Permite que a extensão interaja com qualquer página web.
    *   `"background": { "service_worker": "dist/background.js" }`: Registra o script de background como um Service Worker.
    *   `"action": { "default_popup": "public/index.html" }`: Define o arquivo HTML a ser exibido quando o usuário clica no ícone da extensão.
    *   `"options_page": "public/options.html"`: Define a página para as configurações da extensão.
    *   `"commands"`: Configura o atalho de teclado `Ctrl+Shift+Space` para abrir o chat.
*   **Interações e Dependências:** É o ponto de partida para o Chrome carregar e entender toda a estrutura e capacidades da extensão.

### `package.json`
*   **Propósito:** Define os metadados do projeto Node.js, scripts de build/teste e suas dependências.
*   **Principais Funcionalidades/Lógica:**
    *   `"scripts"`: Contém comandos para `build` (usando Webpack para transpilar e empacotar o código), `dev` (para desenvolvimento com watch mode) e `test` (usando Jest).
    *   `"dependencies"`: Lista as bibliotecas usadas em produção, como `@google/generative-ai` (cliente da API Gemini), `react`, `react-dom` e `react-markdown`.
    *   `"devDependencies"`: Lista as ferramentas de desenvolvimento, como `webpack`, `typescript`, `ts-loader`, `jest`, e tipos (`@types/chrome`).
*   **Interações e Dependências:** Gerenciado pelo `npm` ou `yarn` para instalar as dependências necessárias para desenvolver e construir o projeto.

### `webpack.config.js`
*   **Propósito:** Configurar o empacotador de módulos Webpack.
*   **Principais Funcionalidades/Lógica:**
    *   `entry`: Define os pontos de entrada para o empacotamento (`background/main.ts`, `content/main.ts`, `ui/main.tsx`, `ui/options.tsx`).
    *   `output`: Especifica que os arquivos empacotados devem ser salvos no diretório `dist/` com nomes correspondentes.
    *   `module.rules`: Configura o `ts-loader` para transpilar arquivos TypeScript (`.ts` e `.tsx`) para JavaScript.
    *   `resolve`: Configura o Webpack para resolver importações de arquivos `.ts` e `.tsx`.
*   **Interações e Dependências:** Utilizado pelos scripts no `package.json` para criar os arquivos JavaScript finais que são efetivamente usados pela extensão no diretório `dist/`.

---
### `src/background/main.ts`
*   **Propósito:** É o orquestrador central da extensão (Service Worker). Gerencia o estado, a lógica de negócios, as chamadas à API de IA e a comunicação entre a UI e os content scripts.
*   **Principais Funcionalidades/Lógica:**
    *   `initializeGeminiAI()`: Inicializa o cliente da API Gemini com a chave fornecida pelo usuário.
    *   `chrome.runtime.onMessage`: Listener principal que responde a diferentes tipos de mensagens:
        *   `"CAPTURE_FULL_PAGE"`: Dispara a captura completa da página usando o módulo `fullPageCapture`.
        *   `"START_MULTIMODAL_CHAT"`: Recebe o contexto da página (HTML e screenshot), destila a informação principal usando a IA, gera uma saudação proativa e armazena o estado inicial da conversa.
        *   `"SEND_CHAT_MESSAGE"`: Continua uma conversa existente. Envia o histórico e o contexto da página para a IA. Implementa uma lógica de "detecção de necessidade de pesquisa": se a IA responde que não sabe a resposta (com um marcador como `PRECISO_PESQUISAR`), o script aciona o módulo `webSearch`.
    *   `makeAIRequest()`: Função wrapper para fazer chamadas à API Gemini, com lógica de cache, retentativas (`retry`) e timeout.
    *   `chrome.commands.onCommand`: Listener para o atalho de teclado que abre o popup do chat.
*   **Interações e Dependências:**
    *   **Importa:** Funções de todos os módulos em `src/utils/` e `src/background/config.ts`.
    *   **Recebe mensagens de:** `ui/main.tsx` (para iniciar e continuar o chat) e `ui/options.tsx`.
    *   **Envia mensagens para:** `ui/main.tsx` (com as respostas da IA).
    *   **Depende de:** API `chrome.storage` (para persistência), `chrome.runtime` (mensagens), `chrome.tabs`, `chrome.scripting`.
*   **Manipulação de Dados:**
    *   **Lê e Escreve em:** `chrome.storage.local` para salvar o histórico de conversas (`activeConversation`), o contexto da página (`distilledContext`, `fullPageContext`) e as chaves de API.
    *   **Usa:** `aiResponseCache` e `pageContextCache` do `utils/cache.ts` para armazenar respostas da IA e contextos de página processados.
    *   **Chama:** A API do Google Gemini e as APIs de pesquisa web (SerpAPI/Google Custom Search).

### `src/background/config.ts`
*   **Propósito:** Gerenciar o acesso seguro à API key do Google Gemini e outras configurações.
*   **Principais Funcionalidades/Lógica:**
    *   `getGeminiApiKey()`: Recupera a chave da API do `chrome.storage.local`.
    *   `setGeminiApiKey()`: Salva a chave da API no `chrome.storage.local`.
    *   `isApiKeyConfigured()`: Verifica se a chave já foi configurada.
    *   `clearGeminiApiKey()`: Remove a chave do storage.
*   **Interações e Dependências:**
    *   **Importado por:** `background/main.ts` e `ui/options.tsx`.
    *   **Depende de:** API `chrome.storage`.
*   **Manipulação de Dados:**
    *   Atua como uma camada de abstração para ler e escrever a API key no `chrome.storage.local`.

---
### `src/content/main.ts`
*   **Propósito:** Script injetado na página web para extrair informações contextuais.
*   **Principais Funcionalidades/Lógica:**
    *   `chrome.runtime.onMessage`: Ouve por mensagens do tipo `"GET_PAGE_CONTEXT"`.
    *   `extractContent()`: Quando acionado, extrai o título da página, o HTML (limpando tags desnecessárias como `<script>`, `<style>`, `<nav>`) e o texto puro (`innerText`) do elemento principal da página (`<main>`, `<article>` ou `<body>`).
    *   `MutationObserver`: Implementa uma lógica de "fotógrafo paciente". Ele observa mudanças no DOM, especialmente em sites dinâmicos como o YouTube. Ele espera o conteúdo principal ser carregado antes de extrair os dados, com um timeout de segurança.
*   **Interações e Dependências:**
    *   **Injetado por:** `ui/main.tsx` através da API `chrome.scripting.executeScript`.
    *   **Envia mensagens para:** `ui/main.tsx` (a resposta com o contexto da página).
    *   **Depende de:** API `chrome.runtime`.
*   **Manipulação de Dados:**
    *   **Lê:** O DOM da página ativa para extrair conteúdo. Não armazena dados.

---
### `src/ui/main.tsx`
*   **Propósito:** Renderizar e controlar a interface do chat no popup da extensão, usando React.
*   **Principais Funcionalidades/Lógica:**
    *   `React.useEffect`: Hook principal que inicializa o chat. Ele verifica se já existe uma conversa no `storage`. Se não, ele injeta o `content.js`, obtém o contexto da página, solicita a captura da tela inteira e envia a mensagem `"START_MULTIMODAL_CHAT"` para o `background.js`.
    *   `handleSendMessage()`: Função chamada quando o usuário envia uma mensagem. Ela atualiza o estado da UI e envia a mensagem `"SEND_CHAT_MESSAGE"` para o `background.js` com o histórico atual.
    *   `useState`: Gerencia o estado do componente, incluindo a lista de mensagens (`messages`), o input do usuário (`input`) e o estado de carregamento (`loading`).
    *   `ReactMarkdown`: Componente usado para renderizar as respostas da IA, que vêm em formato Markdown.
*   **Interações e Dependências:**
    *   **Carregado por:** `public/index.html`.
    *   **Envia mensagens para:** `background.js` e `content.js`.
    *   **Recebe mensagens de:** `background.js` (com as respostas da IA).
    *   **Depende de:** API `chrome.runtime`, `chrome.tabs`, `chrome.scripting`, `chrome.storage`.
*   **Manipulação de Dados:**
    *   **Lê de:** `chrome.storage.local` para carregar a conversa ativa ao abrir.
    *   **Ouve por:** Mudanças no `chrome.storage.onChanged` para atualizar a UI em tempo real quando o `background.js` atualiza a conversa.

### `src/ui/options.tsx`
*   **Propósito:** Renderizar e controlar a página de configurações da extensão, usando React.
*   **Principais Funcionalidades/Lógica:**
    *   Gerencia o estado dos formulários para as chaves de API (Gemini, SerpAPI, Google Custom Search).
    *   `handleSaveApiKey()`: Salva a API key do Gemini usando a função `setGeminiApiKey` do `config.ts`.
    *   `handleClearApiKey()`: Remove a API key.
    *   `handleSaveWebSearchConfig()`: Salva as configurações de pesquisa web diretamente no `chrome.storage.local`.
    *   Mostra feedback ao usuário (sucesso, erro) e mascara as chaves de API por segurança após serem salvas.
*   **Interações e Dependências:**
    *   **Carregado por:** `public/options.html`.
    *   **Importa:** Funções de `background/config.ts`.
    *   **Depende de:** API `chrome.storage`.
*   **Manipulação de Dados:**
    *   **Lê e Escreve em:** `chrome.storage.local` para gerenciar todas as chaves de API e configurações da extensão.

---
### `src/utils/*.ts` (Análise Agregada)
*   **Propósito:** Conjunto de módulos com funções de apoio reutilizáveis para manter o código principal mais limpo e organizado.
*   **Principais Funcionalidades/Lógica:**
    *   `cache.ts`: Implementa um sistema de cache LRU (Least Recently Used) com TTL (Time To Live) para armazenar respostas da IA e contextos de página, evitando chamadas repetidas e melhorando a performance.
    *   `errors.ts`: Define classes de erro personalizadas (`ApiKeyError`, `GeminiApiError`) e um wrapper `withErrorHandling` para centralizar o tratamento de exceções, fornecendo mensagens de erro amigáveis ao usuário.
    *   `fullPageCapture.ts`: Contém a lógica complexa para capturar a página inteira. Usa a API `chrome.debugger` para controlar a página, rolar, tirar múltiplos screenshots e "costurá-los" em uma única imagem em formato Data URL.
    *   `performance.ts`: Fornece utilitários de otimização, como `throttle` (para limitar a frequência de chamadas de função), `debounce` e um monitor de performance (`performanceMonitor`) para medir o tempo de execução de operações críticas.
    *   `webSearch.ts`: Abstrai a lógica de pesquisa na web. Contém funções para detectar quando uma pesquisa é necessária (`needsWebSearch`), extrair uma query de pesquisa a partir da conversa (`extractSearchQuery`), chamar as APIs de pesquisa (SerpAPI ou Google) e combinar os resultados da web com o contexto da página.
*   **Interações e Dependências:**
    *   **Importados por:** Principalmente por `background/main.ts`.
    *   **Dependem de:** Várias APIs do Chrome, dependendo da sua função (ex: `debugger` em `fullPageCapture.ts`).
