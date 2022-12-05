module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  "testMatch": [
    '**/*.test.js',
    "**/*.steps.test.js",
    'frontend/src/selenium_tests/StepDefinitions/*.test.js'
  ],
}