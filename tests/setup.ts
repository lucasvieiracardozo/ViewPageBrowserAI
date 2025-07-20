// tests/setup.ts - Configuração global para testes

import '@testing-library/jest-dom';

// Mock global do Chrome APIs
global.chrome = {
  storage: {
    sync: {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    },
    local: {
      get: jest.fn(),
      set: jest.fn(),
      clear: jest.fn(),
    },
  },
  runtime: {
    sendMessage: jest.fn(),
    onMessage: {
      addListener: jest.fn(),
    },
    lastError: null,
  },
  tabs: {
    query: jest.fn(),
    sendMessage: jest.fn(),
    captureVisibleTab: jest.fn(),
  },
  scripting: {
    executeScript: jest.fn(),
  },
  commands: {
    onCommand: {
      addListener: jest.fn(),
    },
  },
  action: {
    openPopup: jest.fn(),
  },
} as any;

// Mock do console para testes mais limpos
global.console = {
  ...console,
  // Silencia logs durante testes, mas mantém errors e warns
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: console.warn,
  error: console.error,
};

// Reset mocks antes de cada teste
beforeEach(() => {
  jest.clearAllMocks();
});
