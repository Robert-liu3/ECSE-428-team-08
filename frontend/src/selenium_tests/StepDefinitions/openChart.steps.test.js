const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require ('chromedriver');
const jestSetup = require("../../jest.setup");
const jestCucumber = require("jest-cucumber");

const screen_obj = {
  width: 1920,
  height: 1080,
};

const setupChromeDriver = async () => {
  // Configure the driver
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless().windowSize(screen_obj))
    .build();

  await driver.manage().window().maximize();

  await driver.get("http://localhost:3000/");

  return driver;
};

// Configure the feature file for testing with Jest Cucumber
const feature = jestCucumber.loadFeature(
  './src/selenium_tests/Features/ID001_Open_Market_Chart.feature'
);

jestCucumber.defineFeature(feature, (test) => {
  test("Open Market Chart", async ({ given, when, then }) => {
    let driver;

    given("the customer is on the Home Page of the website", async () => {
      driver = await setupChromeDriver();
    });

    when("the Home Page loads itself", async () => {
      driver.sleep(1000);
    });

    then("a market chart of AAPL is displayed", async (symbol) => {
      await driver.wait(
        until.elementLocated(
          By.xpath("//iframe[starts-with(@id,'tradingview_')]")
        )
      );

      await driver
        .switchTo()
        .frame(
          driver.findElement(
            By.xpath("//iframe[starts-with(@id,'tradingview_')]")
          )
        );

      let ticker;
      await driver
        .wait(
          until.elementIsVisible(
            driver.findElement(
              By.xpath(
                "//div[starts-with(@id,'header-toolbar-symbol-search')]/div[starts-with(@class,'js-button-text text')]"
              )
            )
          )
        )
        .then(async (el) => {
          ticker = await el.getText();
        });

      expect(ticker).toBe('AAPL');
      await driver.quit();
    });
  });
});
