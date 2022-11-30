module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  "testMatch": [
    '**/*.test.js',
    'frontend/src/selenium_tests/StepDefinitions/*.test.js',
  ],
}