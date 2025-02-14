import { defineConfig } from "cypress";
const { beforeRunHook, afterRunHook } = require("cypress-mochawesome-reporter/lib");
const webpackPreprocessor = require("@cypress/webpack-preprocessor");
const path = require("path");

export default defineConfig({
  projectId: "hmi7am",
  reporter: "cypress-mochawesome-reporter", // Usa el reporter mochawesome
  reporterOptions: {
    reportDir: "cypress/reports", // Carpeta donde se guardarán los reportes
    charts: true, // Incluir gráficos en el reporte
    reportPageTitle: "Resultados de Pruebas Cypress",
    embeddedScreenshots: true, // Incrustar capturas de pantalla en el reporte
    inlineAssets: true, // Incrustar archivos de estilos y scripts en el reporte
  },
  retries: {
    runMode: 1, // Número de reintentos en modo headless
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Configuración para cypress-mochawesome-reporter
      on("before:run", async (details) => {
        console.log("Ejecutando antes de las pruebas...");
        await beforeRunHook(details);
      });

      on("after:run", async () => {
        console.log("Generando reporte después de las pruebas...");
        await afterRunHook();
      });

      // Configuración del preprocesador de Webpack
      const webpackOptions = {
        webpackOptions: require(path.resolve(__dirname, "./webpack.config.js")), // Usa tu archivo webpack.config.js
        watchOptions: {},
      };
      on("file:preprocessor", webpackPreprocessor(webpackOptions));

      return config;
    },
    specPattern: "cypress/integration/*/*.{js,ts}", // Usa archivos .js o .ts para las pruebas
    defaultCommandTimeout: 5000,
    env: {
      url: "https://rahulshettyacademy.com/loginpagePractise/",
      username: "rahulshettyacademy",
      password: "learning",
    },
  },
});