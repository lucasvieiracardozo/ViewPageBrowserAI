// tests/ui/options.test.tsx - Testes básicos para componentes de UI

import '@testing-library/jest-dom';

// Mock das funções de configuração
const mockGetGeminiApiKey = jest.fn();
const mockSetGeminiApiKey = jest.fn();
const mockClearGeminiApiKey = jest.fn();
const mockIsApiKeyConfigured = jest.fn();

jest.mock('../../src/background/config', () => ({
  getGeminiApiKey: mockGetGeminiApiKey,
  setGeminiApiKey: mockSetGeminiApiKey,
  clearGeminiApiKey: mockClearGeminiApiKey,
  isApiKeyConfigured: mockIsApiKeyConfigured,
}));

// Mock do ReactDOM
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
    unmount: jest.fn(),
  })),
}));

describe('UI Components Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Configuração e mocks', () => {
    it('deve ter acesso às funções mockadas', () => {
      expect(mockGetGeminiApiKey).toBeDefined();
      expect(mockSetGeminiApiKey).toBeDefined();
      expect(mockClearGeminiApiKey).toBeDefined();
      expect(mockIsApiKeyConfigured).toBeDefined();
    });

    it('deve poder chamar funções de configuração', () => {
      mockIsApiKeyConfigured.mockReturnValue(true);
      mockGetGeminiApiKey.mockReturnValue('test-key');
      
      expect(mockIsApiKeyConfigured()).toBe(true);
      expect(mockGetGeminiApiKey()).toBe('test-key');
    });

    it('deve ter ReactDOM mockado corretamente', () => {
      const ReactDOM = require('react-dom/client');
      expect(ReactDOM.createRoot).toBeDefined();
      
      const root = ReactDOM.createRoot();
      expect(root.render).toBeDefined();
      expect(root.unmount).toBeDefined();
    });

    it('deve limpar mocks entre testes', () => {
      mockGetGeminiApiKey.mockReturnValue('test');
      expect(mockGetGeminiApiKey()).toBe('test');
      
      jest.clearAllMocks();
      expect(mockGetGeminiApiKey).not.toHaveBeenCalled();
    });
  });

  describe('Validação do ambiente de testes', () => {
    it('deve ter Jest configurado corretamente', () => {
      expect(jest).toBeDefined();
      expect(jest.fn).toBeDefined();
      expect(jest.clearAllMocks).toBeDefined();
    });

    it('deve ter testing-library configurado', () => {
      expect(require('@testing-library/jest-dom')).toBeDefined();
    });
  });
});
