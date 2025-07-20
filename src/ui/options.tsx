// src/ui/options.tsx - Página de configurações da extensão

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { getGeminiApiKey, setGeminiApiKey, clearGeminiApiKey, isApiKeyConfigured } from '../background/config';

const OptionsApp = () => {
  const [apiKey, setApiKeyState] = useState<string>('');
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);
  
  // Estados para APIs de pesquisa web
  const [serpApiKey, setSerpApiKey] = useState<string>('');
  const [googleSearchApiKey, setGoogleSearchApiKey] = useState<string>('');
  const [googleSearchEngineId, setGoogleSearchEngineId] = useState<string>('');
  const [webSearchConfigured, setWebSearchConfigured] = useState<{ serpapi: boolean; google: boolean }>({ serpapi: false, google: false });

  useEffect(() => {
    loadCurrentConfig();
  }, []);

  const loadCurrentConfig = async () => {
    try {
      setLoading(true);
      const configured = await isApiKeyConfigured();
      setIsConfigured(configured);
      
      if (configured) {
        const currentKey = await getGeminiApiKey();
        if (currentKey) {
          // Mostra apenas os primeiros e últimos caracteres por segurança
          const maskedKey = `${currentKey.substring(0, 8)}...${currentKey.substring(currentKey.length - 4)}`;
          setApiKeyState(maskedKey);
        }
      }
      
      // Carregar configurações de pesquisa web
      const webSearchConfig = await chrome.storage.local.get([
        'serpApiKey', 'googleSearchApiKey', 'googleSearchEngineId'
      ]);
      
      if (webSearchConfig.serpApiKey) {
        const maskedSerpKey = `${webSearchConfig.serpApiKey.substring(0, 8)}...${webSearchConfig.serpApiKey.substring(webSearchConfig.serpApiKey.length - 4)}`;
        setSerpApiKey(maskedSerpKey);
      }
      
      if (webSearchConfig.googleSearchApiKey) {
        const maskedGoogleKey = `${webSearchConfig.googleSearchApiKey.substring(0, 8)}...${webSearchConfig.googleSearchApiKey.substring(webSearchConfig.googleSearchApiKey.length - 4)}`;
        setGoogleSearchApiKey(maskedGoogleKey);
      }
      
      if (webSearchConfig.googleSearchEngineId) {
        setGoogleSearchEngineId(webSearchConfig.googleSearchEngineId);
      }
      
      setWebSearchConfigured({
        serpapi: !!webSearchConfig.serpApiKey,
        google: !!(webSearchConfig.googleSearchApiKey && webSearchConfig.googleSearchEngineId)
      });
      
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
      setMessage({ type: 'error', text: 'Erro ao carregar configuração atual' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      setMessage({ type: 'error', text: 'Por favor, insira uma API key válida' });
      return;
    }

    try {
      setSaving(true);
      setMessage(null);
      
      await setGeminiApiKey(apiKey.trim());
      
      // Se chegou até aqui, a API key foi salva com sucesso
      setMessage({ type: 'success', text: 'API key salva com sucesso!' });
      setIsConfigured(true);
      // Mascara a API key após salvar
      const maskedKey = `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}`;
      setApiKeyState(maskedKey);
    } catch (error) {
      console.error('Erro ao salvar API key:', error);
      setMessage({ type: 'error', text: 'Erro inesperado ao salvar API key' });
    } finally {
      setSaving(false);
    }
  };

  const handleClearApiKey = async () => {
    if (!confirm('Tem certeza que deseja remover a API key? A extensão não funcionará sem ela.')) {
      return;
    }

    try {
      setSaving(true);
      setMessage(null);
      
      await clearGeminiApiKey();
      setApiKeyState('');
      setIsConfigured(false);
      setMessage({ type: 'success', text: 'API key removida com sucesso!' });
    } catch (error) {
      console.error('Erro ao remover API key:', error);
      setMessage({ type: 'error', text: 'Erro ao remover API key' });
    } finally {
      setSaving(false);
    }
  };

  const handleNewApiKey = () => {
    setApiKeyState('');
    setMessage(null);
  };

  const handleSaveWebSearchConfig = async () => {
    try {
      setSaving(true);
      setMessage(null);
      
      await chrome.storage.local.set({
        serpApiKey: serpApiKey.trim(),
        googleSearchApiKey: googleSearchApiKey.trim(),
        googleSearchEngineId: googleSearchEngineId.trim()
      });
      
      setWebSearchConfigured({
        serpapi: !!serpApiKey.trim(),
        google: !!(googleSearchApiKey.trim() && googleSearchEngineId.trim())
      });
      
      setMessage({ type: 'success', text: 'Configuração de pesquisa web salva com sucesso!' });
    } catch (error) {
      console.error('Erro ao salvar configuração de pesquisa web:', error);
      setMessage({ type: 'error', text: 'Erro ao salvar configuração de pesquisa web' });
    } finally {
      setSaving(false);
    }
  };

  const handleClearWebSearchConfig = async () => {
    try {
      setSaving(true);
      setMessage(null);
      
      await chrome.storage.local.remove(['serpApiKey', 'googleSearchApiKey', 'googleSearchEngineId']);
      
      setSerpApiKey('');
      setGoogleSearchApiKey('');
      setGoogleSearchEngineId('');
      
      setWebSearchConfigured({ serpapi: false, google: false });
      
      setMessage({ type: 'success', text: 'Configuração de pesquisa web removida com sucesso!' });
    } catch (error) {
      console.error('Erro ao remover configuração de pesquisa web:', error);
      setMessage({ type: 'error', text: 'Erro ao remover configuração de pesquisa web' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <p>Carregando configurações...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          color: '#333', 
          marginBottom: '20px',
          borderBottom: '2px solid #4285f4',
          paddingBottom: '10px'
        }}>
          ViewPageBrowserAI - Configurações
        </h1>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#555', fontSize: '18px', marginBottom: '15px' }}>
            Configuração da API Key do Google Gemini
          </h2>
          
          <div style={{ 
            backgroundColor: '#e3f2fd', 
            padding: '15px', 
            borderRadius: '5px',
            marginBottom: '20px',
            border: '1px solid #bbdefb'
          }}>
            <p style={{ margin: '0', color: '#1565c0', fontSize: '14px' }}>
              <strong>Como obter sua API key:</strong><br/>
              1. Acesse <a href="https://makersuite.google.com/app/apikey" target="_blank" style={{ color: '#1565c0' }}>Google AI Studio</a><br/>
              2. Clique em "Create API Key"<br/>
              3. Copie a chave gerada e cole abaixo
            </p>
          </div>

          {isConfigured ? (
            <div>
              <p style={{ color: '#2e7d32', fontWeight: 'bold', marginBottom: '15px' }}>
                ✅ API key configurada
              </p>
              <div style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '10px', 
                borderRadius: '4px',
                fontFamily: 'monospace',
                marginBottom: '15px'
              }}>
                {apiKey}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleNewApiKey}
                  style={{
                    backgroundColor: '#ff9800',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Alterar API Key
                </button>
                <button
                  onClick={handleClearApiKey}
                  disabled={saving}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    opacity: saving ? 0.6 : 1
                  }}
                >
                  {saving ? 'Removendo...' : 'Remover API Key'}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '10px', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                API Key do Google Gemini:
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKeyState(e.target.value)}
                placeholder="Cole sua API key aqui..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  marginBottom: '15px',
                  boxSizing: 'border-box'
                }}
              />
              <button
                onClick={handleSaveApiKey}
                disabled={saving || !apiKey.trim()}
                style={{
                  backgroundColor: '#4285f4',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '4px',
                  cursor: saving || !apiKey.trim() ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  opacity: saving || !apiKey.trim() ? 0.6 : 1
                }}
              >
                {saving ? 'Salvando...' : 'Salvar API Key'}
              </button>
            </div>
          )}

          {message && (
            <div style={{
              marginTop: '20px',
              padding: '12px',
              borderRadius: '4px',
              backgroundColor: message.type === 'success' ? '#d4edda' : 
                             message.type === 'error' ? '#f8d7da' : '#d1ecf1',
              color: message.type === 'success' ? '#155724' : 
                     message.type === 'error' ? '#721c24' : '#0c5460',
              border: `1px solid ${message.type === 'success' ? '#c3e6cb' : 
                                  message.type === 'error' ? '#f5c6cb' : '#bee5eb'}`
            }}>
              {message.text}
            </div>
          )}
        </div>

        {/* Seção de Pesquisa Web */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#555', fontSize: '18px', marginBottom: '15px' }}>
            Configuração de Pesquisa Web (Opcional)
          </h2>
          
          <div style={{ 
            backgroundColor: '#fff3e0', 
            padding: '15px', 
            borderRadius: '5px',
            marginBottom: '20px',
            border: '1px solid #ffcc02'
          }}>
            <p style={{ margin: '0 0 10px 0', color: '#e65100', fontSize: '14px' }}>
              <strong>Funcionalidade Avançada:</strong> Configure uma API de pesquisa para que a IA possa buscar informações na web quando o conteúdo da página não for suficiente.
            </p>
            <p style={{ margin: '0', color: '#bf360c', fontSize: '12px' }}>
              <strong>Status:</strong> {webSearchConfigured.serpapi || webSearchConfigured.google ? 
                `✅ Configurado (${webSearchConfigured.serpapi ? 'SerpAPI' : ''}${webSearchConfigured.serpapi && webSearchConfigured.google ? ' + ' : ''}${webSearchConfigured.google ? 'Google' : ''})` : 
                '❌ Não configurado'}
            </p>
          </div>

          {/* SerpAPI Configuration */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>
              Opção 1: SerpAPI (Recomendado - Mais Fácil)
            </h3>
            <div style={{ 
              backgroundColor: '#f0f8ff', 
              padding: '12px', 
              borderRadius: '4px',
              marginBottom: '15px',
              border: '1px solid #b3d9ff'
            }}>
              <p style={{ margin: '0 0 8px 0', color: '#0066cc', fontSize: '13px' }}>
                <strong>Como obter:</strong> Acesse <a href="https://serpapi.com/" target="_blank" style={{ color: '#0066cc' }}>SerpAPI.com</a> → Crie conta gratuita → Copie sua API key
              </p>
              <p style={{ margin: '0', color: '#004499', fontSize: '12px' }}>
                Plano gratuito: 100 pesquisas/mês
              </p>
            </div>
            
            <input
              type="password"
              placeholder="Cole sua SerpAPI key aqui..."
              value={serpApiKey}
              onChange={(e) => setSerpApiKey(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'monospace',
                marginBottom: '10px'
              }}
            />
          </div>

          {/* Google Custom Search Configuration */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>
              Opção 2: Google Custom Search (Mais Complexo)
            </h3>
            <div style={{ 
              backgroundColor: '#f0f8ff', 
              padding: '12px', 
              borderRadius: '4px',
              marginBottom: '15px',
              border: '1px solid #b3d9ff'
            }}>
              <p style={{ margin: '0 0 8px 0', color: '#0066cc', fontSize: '13px' }}>
                <strong>Requer 2 configurações:</strong>
              </p>
              <p style={{ margin: '0 0 5px 0', color: '#004499', fontSize: '12px' }}>
                1. API Key: <a href="https://console.developers.google.com/" target="_blank" style={{ color: '#0066cc' }}>Google Cloud Console</a> → Enable Custom Search API
              </p>
              <p style={{ margin: '0', color: '#004499', fontSize: '12px' }}>
                2. Search Engine ID: <a href="https://cse.google.com/" target="_blank" style={{ color: '#0066cc' }}>Google Custom Search</a> → Create search engine
              </p>
            </div>
            
            <input
              type="password"
              placeholder="Google Search API Key..."
              value={googleSearchApiKey}
              onChange={(e) => setGoogleSearchApiKey(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'monospace',
                marginBottom: '10px'
              }}
            />
            
            <input
              type="text"
              placeholder="Google Search Engine ID..."
              value={googleSearchEngineId}
              onChange={(e) => setGoogleSearchEngineId(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'monospace',
                marginBottom: '10px'
              }}
            />
          </div>

          {/* Web Search Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={handleSaveWebSearchConfig}
              disabled={saving || (!serpApiKey.trim() && !googleSearchApiKey.trim() && !googleSearchEngineId.trim())}
              style={{
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: saving || (!serpApiKey.trim() && !googleSearchApiKey.trim() && !googleSearchEngineId.trim()) ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                opacity: saving || (!serpApiKey.trim() && !googleSearchApiKey.trim() && !googleSearchEngineId.trim()) ? 0.6 : 1
              }}
            >
              {saving ? 'Salvando...' : 'Salvar Pesquisa Web'}
            </button>
            
            {(webSearchConfigured.serpapi || webSearchConfigured.google) && (
              <button
                onClick={handleClearWebSearchConfig}
                disabled={saving}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  opacity: saving ? 0.6 : 1
                }}
              >
                Remover Configurações
              </button>
            )}
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid #eee', 
          paddingTop: '20px',
          color: '#666',
          fontSize: '12px'
        }}>
          <p><strong>Sobre a segurança:</strong></p>
          <ul style={{ marginLeft: '20px' }}>
            <li>Suas API keys são armazenadas localmente no navegador</li>
            <li>Não são enviadas para nenhum servidor externo além dos respectivos serviços</li>
            <li>Apenas você tem acesso a estas configurações</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Renderiza a aplicação apenas se estivermos na página de opções
if (document.getElementById('options-root')) {
  const root = ReactDOM.createRoot(document.getElementById('options-root')!);
  root.render(<React.StrictMode><OptionsApp /></React.StrictMode>);
}
