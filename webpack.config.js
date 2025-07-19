const path = require('path');

module.exports = {
  // Modo de desenvolvimento para facilitar o debug. Mude para 'production' para a versão final.
  mode: 'development',
  
  // Desabilita o eval para ser compatível com as políticas de segurança de extensões do Chrome.
  devtool: 'cheap-module-source-map',

  // Define os pontos de entrada do nosso código. Webpack começará a empacotar a partir daqui.
  entry: {
    // Cada entrada gerará um arquivo de saída separado.
    background: './src/background/main.ts',
    content: './src/content/main.ts',
    ui: './src/ui/main.tsx', // Nosso app React
  },

  // Onde os arquivos empacotados serão colocados.
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // O nome do arquivo de saída será o mesmo da chave de entrada (ex: background.js)
  },

  // Regras sobre como o Webpack deve tratar diferentes tipos de arquivos.
  module: {
    rules: [
      {
        // Para todos os arquivos que terminam em .ts ou .tsx
        test: /\.(ts|tsx)$/,
        // Use o 'ts-loader' para transpilar (converter) o TypeScript em JavaScript.
        use: 'ts-loader',
        // Não processe arquivos na pasta node_modules.
        exclude: /node_modules/,
      },
    ],
  },

  // Define quais extensões de arquivo o Webpack deve resolver automaticamente.
  // Isso nos permite fazer `import App from './App'` em vez de `./App.tsx`.
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};