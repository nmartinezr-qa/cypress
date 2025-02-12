const { defineConfig } = require("cypress");

const browserify = require("@cypress/browserify-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprendTransformerToOptions,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  require('cypress-mochawesome-reporter/plugin')(on);

  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  const webpack = require('@cypress/webpack-preprocessor');

      const options = {
        webpackOptions: {
          resolve: {
            extensions: [".ts", ".js"]
          },
          module: {
            rules: [
              {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: "ts-loader"
              }
            ]
          }
        }
      };

      on(
        "file:preprocessor",
        webpack(options),
        browserify(preprendTransformerToOptions(config, browserify.defaultOptions)),
      );

  // Make sure to return the config object as it might have been modified by the plugin.
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
    //specPattern: "cypress/integration/examples/BDD/*.feature",
    defaultCommandTimeout: 5000,
    env: {
      url: "https://rahulshettyacademy.com/loginpagePractise/",
      username: "rahulshettyacademy",
      password: "learning",
    },
  },
});
