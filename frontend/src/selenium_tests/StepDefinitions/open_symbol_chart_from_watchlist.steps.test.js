const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");
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
  "./src/selenium_tests/Features/ID055_Open-Chart-Of-Symbol-From-Watchlist.feature"
);

jestCucumber.defineFeature(feature, (test) => {
  let driver;

  test("Open the chart of a symbol in the watchlist", ({
    given,
    when,
    then,
  }) => {
    given('the watchlist is open and displayed to the user', async () => {
      driver = await setupChromeDriver();
      // Enter the chart frame
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
    });

    when("the User selects NQ1! from the watchlist", async () => {
      // Get the watchlist and click on the symbol {symbol_from_watchlist} inside the watchlist
      await driver
        .wait(until.elementLocated(By.xpath("//span[contains(text(), 'NQ1!')]")))
        .then(async (el) => {
          await driver.actions().click(el).perform();
        });

      await driver.sleep(5000); // wait for the page to load
    });

    then("a chart of NQ1! is displayed", async (arg0) => {
      // Verify that the correct ticker symbol has been set
      let ticker;
      await driver
        .wait(
          until.elementIsVisible(
            driver.findElement(
              By.xpath(
                "//div[starts-with(@id,'header-toolbar-symbol-search')]//div[starts-with(@class,'js-button-text text')]"
              )
            )
          )
        )
        .then(async (el) => {
          ticker = await el.getText();
        });

      expect(ticker).toBe("NQ1!");

      await driver.quit();
    });
  });
});
