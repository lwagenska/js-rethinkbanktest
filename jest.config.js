module.exports = {
  testMatch: ["**/__tests__/**/*.test.js"],
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
