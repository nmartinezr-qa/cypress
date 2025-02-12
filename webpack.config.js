const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'], // Agrega .ts para que Webpack reconozca TypeScript
    alias: {
      '@PageObjects': path.resolve(__dirname, 'cypress/support/PageObjects/'), // Ajusta el path según tu estructura
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Indica que Webpack debe procesar archivos .ts
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.js$/, // Asegura que también se procesen archivos .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};