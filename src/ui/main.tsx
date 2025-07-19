// src/ui/main.tsx - VERSÃO FINAL CORRIGIDA E COMPLETA

import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initialize = async () => {
      const data = await chrome.storage.local.get("activeConversation");
      if (data.activeConversation && data.activeConversation.history.length > 0) {
        setMessages(data.activeConversation.history);
        setLoading(false);
      } else {
        setLoading(true);
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab && tab.id) {
          try {
            await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['dist/content.js'] });
            const pageContext = await chrome.tabs.sendMessage(tab.id, { type: "GET_PAGE_CONTEXT" });
            const screenshotDataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, { format: "jpeg", quality: 50 });
            
            chrome.runtime.sendMessage(
              { type: "START_MULTIMODAL_CHAT", screenshotDataUrl, pageContext },
              (response) => {
                if (chrome.runtime.lastError || !response || response.error) {
                  const errorMessage = chrome.runtime.lastError?.message || response?.error || "Erro desconhecido";
                  setMessages([{ role: 'model', text: `Erro: ${errorMessage}` }]);
                } else {
                  setMessages([{ role: 'model', text: response.text }]);
                }
                setLoading(false);
              }
            );
          } catch (e) {
            setMessages([{ role: 'model', text: "Oops! Não consegui ler esta página." }]);
            setLoading(false);
          }
        }
      }
    };
    initialize();

    const storageListener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.activeConversation) {
        setMessages(changes.activeConversation.newValue.history || []);
        setLoading(false);
      }
    };
    chrome.storage.onChanged.addListener(storageListener);
    return () => chrome.storage.onChanged.removeListener(storageListener);
  }, []);

  useEffect(() => { if (chatHistoryRef.current) chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight; }, [messages, loading]);

  const handleSendMessage = () => {
    if (!input.trim() || loading) return;
    const userMessage: Message = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages); setInput(''); setLoading(true);
    chrome.runtime.sendMessage(
      { type: "SEND_CHAT_MESSAGE", history: newMessages },
      (response) => { 
        if (chrome.runtime.lastError || !response || response.error) {
          const errorMessage = chrome.runtime.lastError?.message || response?.error || "Erro desconhecido";
          const errorMsg: Message = { role: 'model', text: `Erro: ${errorMessage}` };
          setMessages([...newMessages, errorMsg]);
        } else {
          const newAIMessage: Message = { role: 'model', text: response.text };
          setMessages([...newMessages, newAIMessage]);
        }
        setLoading(false);
      }
    );
  };
  
  const containerStyle: React.CSSProperties = { width: '400px', height: '550px', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif', fontSize: '14px', padding: '10px' };
  const historyStyle: React.CSSProperties = { flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' };
  const messageWrapperStyle = (role: string): React.CSSProperties => ({
    display: 'flex',
    justifyContent: role === 'user' ? 'flex-end' : 'flex-start',
    marginBottom: '10px',
  });
  const messageStyle = (role: string): React.CSSProperties => ({
    padding: '8px 12px',
    borderRadius: '18px',
    maxWidth: '80%',
    wordWrap: 'break-word',
    backgroundColor: role === 'user' ? '#0b93f6' : '#e5e5ea',
    color: role === 'user' ? 'white' : 'black',
  });
  const inputAreaStyle: React.CSSProperties = { display: 'flex', borderTop: '1px solid #ddd', paddingTop: '10px', marginTop: 'auto' };
  const inputStyle: React.CSSProperties = { flexGrow: 1, marginRight: '10px', border: '1px solid #ccc', padding: '8px', borderRadius: '20px' };
  
  return (
    <div style={containerStyle}>
      <div style={historyStyle} ref={chatHistoryRef}>
        {messages.map((msg, index) => (
          <div key={index} style={messageWrapperStyle(msg.role)}>
            {/* --- CORREÇÃO 1: A CLASSE VAI NA DIV EXTERNA --- */}
            <div style={messageStyle(msg.role)} className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && <p><i>IA está pensando...</i></p>}
      </div>
      <div style={inputAreaStyle}>
        <input style={inputStyle} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} disabled={loading} placeholder="Digite sua mensagem..."/>
        <button onClick={handleSendMessage} disabled={loading}>Enviar</button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
// --- CORREÇÃO 2: USANDO O NOME CORRETO 'App' ---
root.render(<React.StrictMode><App /></React.StrictMode>);