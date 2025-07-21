# ViewPageBrowserAI: Seu Copiloto de IA para a Web

**Slogan:** Transforme qualquer página da web em uma conversa inteligente. Entenda mais rápido, aprenda mais fundo.

---

![Banner do Projeto](https://placehold.co/1200x400/1a1a1a/ffffff?text=ViewPageBrowserAI&font=raleway)

## Visão Geral

Em um mundo saturado de informação, o consumo de conteúdo online permanece em grande parte uma experiência passiva. Nós lemos, assistimos e rolamos a tela, mas raramente engajamos com a informação em um nível mais profundo. O **ViewPageBrowserAI** nasceu para desafiar esse paradigma.

Esta é uma extensão para o Google Chrome de código aberto, projetada para atuar como um assistente de IA multimodal diretamente no seu navegador. Utilizando o poder da API Gemini do Google, a extensão não apenas "lê" o texto, mas também "vê" a estrutura visual de qualquer página da web. Essa capacidade multimodal permite um entendimento contextual rico, que vai muito além da simples extração de palavras.

O objetivo é transformar a navegação em um diálogo. A extensão analisa o conteúdo para iniciar uma conversa proativa, oferecer resumos inteligentes, responder perguntas complexas e, no futuro, se integrar perfeitamente ao seu ecossistema de produtividade, tornando-se uma ponte entre o conhecimento e a ação.

---

## ✨ Principais Funcionalidades (MVP v1.0)

* **Análise Multimodal Profunda:** Vamos além do texto. Nossa IA analisa a estrutura visual da página, gráficos e imagens para obter um entendimento contextual que se aproxima da compreensão humana.

* **Chat Conversacional Intuitivo:** Faça perguntas em linguagem natural. Peça para simplificar um tópico complexo, gerar um resumo executivo ou explorar ideias relacionadas. A informação se torna acessível através de um diálogo, não de uma busca.

* **Captura de Página Completa e Otimizada:** Desenvolvemos um sistema robusto para capturar o conteúdo de páginas longas e dinâmicas (Single-Page Applications), garantindo que a IA tenha o contexto completo para uma análise precisa, sem comprometer a sua experiência de navegação.

* **Persistência de Conversas com Firestore:** Nunca perca um insight. O histórico de suas conversas é salvo de forma segura usando o Cloud Firestore, permitindo que você continue suas sessões de aprendizado e pesquisa de onde parou, a qualquer momento.

* **Acessibilidade como Missão:** Este projeto foi concebido com a missão de ser uma ferramenta de empoderamento. Desde o início, estamos construindo funcionalidades para auxiliar usuários com deficiências visuais e auditivas, tornando a web um lugar mais acessível para todos.

---

## 🚀 Guia de Instalação

### Instalação para Usuários (Em Breve)

O `ViewPageBrowserAI` estará disponível em breve na Chrome Web Store para uma instalação simples e com um clique.

### Instalação para Desenvolvedores

Para contribuir ou rodar o projeto localmente, você precisará ter o Node.js e o npm instalados.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/lucasvieiracardozo/ViewPageBrowserAI.git](https://github.com/lucasvieiracardozo/ViewPageBrowserAI.git)
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd ViewPageBrowserAI
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Compile o projeto para desenvolvimento:**
    ```bash
    npm run build
    ```
    *(Este comando usará o Webpack para transpilar os arquivos TypeScript/React e empacotá-los no diretório `/dist`)*

5.  **Instale a extensão no Chrome:**
    * Abra o Chrome e navegue até `chrome://extensions`.
    * Ative o "Modo do desenvolvedor" no canto superior direito.
    * Clique em "Carregar sem compactação".
    * Selecione o diretório `dist` que foi gerado no seu projeto.

---

## 🗺️ Roadmap Futuro

Nossa visão para o `ViewPageBrowserAI` é ambiciosa. O MVP atual é apenas a fundação. Aqui está um vislumbre do que planejamos para o futuro:

* **Fase 2: O Agente de Produtividade**
    * **Objetivo:** Transformar insights em ações.
    * **Funcionalidades:** Login com Google para uma experiência personalizada, integração com Google Drive para salvar notas, Google Calendar para agendar eventos e Google Tasks para criar listas de tarefas diretamente a partir do conteúdo da web.

* **Fase 3: A Inteligência Ambiente**
    * **Objetivo:** Tornar a interação tão fluida que a tecnologia se torna invisível.
    * **Funcionalidades:** Comandos de voz e respostas em áudio (Text-to-Speech), "Memória de Longo Prazo" usando Embeddings para que a IA se lembre de conversas e páginas passadas, e um modelo de assinatura para desbloquear funcionalidades "Pro".

---

## 🤝 Contribuições

Este é um projeto de código aberto construído com a crença de que a tecnologia pode aprimorar a forma como aprendemos e interagimos com a informação. Contribuições são imensamente bem-vindas! Se você tem ideias para novas funcionalidades, melhorias de código ou quer ajudar a expandir nossa missão de acessibilidade, sinta-se à vontade para abrir uma "Issue" para discussão ou um "Pull Request" com suas mudanças.

---

**Desenvolvido com ❤️ e IA.**
