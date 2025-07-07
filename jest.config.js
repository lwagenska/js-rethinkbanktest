module.exports = {
  testMatch: ["**/__tests__/**/*.test.js"],
  testTimeout: 10000, // Nativamente, o Jest tem um timeout de 5s e estava quebrando alguns testes
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Relatório dos Testes Automatizados',
      outputPath: './coverage/test-report.html',
      includeFailureMsg: true,
      includeConsoleLog: true,
      theme: 'darkTheme' // Pode ser: defaultTheme, darkTheme, lightTheme
    }]
  ]
};
