const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const path = require("path");
const webpack = require("@cypress/webpack-preprocessor");
const browserify = require("@cypress/browserify-preprocessor");

async function setupNodeEvents(on, config) {
  require('cypress-mochawesome-reporter/plugin')(on);

  // Configuración para Cucumber
  await addCucumberPreprocessorPlugin(on, config);
  
  require('ts-node/register');

  // Configuración de Webpack
  const webpackOptions = {
    webpackOptions: require(path.resolve(__dirname, './webpack.config.js')), // Usa un archivo JS para la configuración de Webpack
    watchOptions: {},
  };

  on(
    "file:preprocessor",
    webpack(webpackOptions),  // Usa solo Webpack como preprocesador
    browserify(browserify.defaultOptions)  // O usa Browserify si lo prefieres en lugar de Webpack
  );

  return config;
}

module.exports = defineConfig({
  projectId: "hmi7am",
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports', // Carpeta donde se guardarán los reportes
    charts: true, // Incluir gráficos en el reporte
    reportPageTitle: 'Resultados de Pruebas Cypress',
    embeddedScreenshots: true, // Incrustar capturas de pantalla en el reporte
    inlineAssets: true // Incrustar archivos CSS y JS directamente en el reporte
  },
  retries: {
    runMode: 1,
  },
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/integration/*/*.{js,ts}",
    //specPattern: "cypress/integration/**/*.feature", // Utiliza archivos .feature para Cucumber
    defaultCommandTimeout: 5000,
    env: {
      url: "https://rahulshettyacademy.com/loginpagePractise/",
      username: "rahulshettyacademy",
      password: "learning",
    },
  },
});