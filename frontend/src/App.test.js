const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const screen_obj = {
  width: 640,
  height: 480,
};

const run_chart_tests = async () => {
  let driver = await new Builder().forBrowser('chrome')
                                  .setChromeOptions(new chrome.Options().headless().windowSize(screen_obj))
                                  .build();

  await driver.get("http://localhost:3000/");

  var title = await driver.getTitle();

  await driver.quit();

  return title;
}

test('charts hello', () => {
  jest.useFakeTimers('legacy')
  console.log("Hello");

  expect(true).toBe(true);
});

test('charts', async() => {
  jest.useFakeTimers('legacy')
  let title = await run_chart_tests();
  console.log(title);
  expect(title).toBe('React App');
});
