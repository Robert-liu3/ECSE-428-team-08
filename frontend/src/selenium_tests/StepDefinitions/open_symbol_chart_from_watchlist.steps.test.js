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
  "Features/ID055_Open-Chart-Of-Symbol-From-Watchlist.feature"
);

console.log("Feature file:", feature);

jestCucumber.defineFeature(feature, (test) => {
  let driver;

  test("selectSymbolFromWatchlist", async ({ given, when, then }) => {
    driver = await setupChromeDriver();

    given("the watchlist is open and displayed to the user", async () => {
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

    when(
      "the User selects {symbol_from_watchlist} from the watchlist",
      async (symbol_from_watchlist) => {
        // Get the watchlist and click on the symbol {symbol_from_watchlist} inside the watchlist
        await driver
          .wait(
            until.elementLocated(
              By.xpath("//span[contains(text(), ", symbol_from_watchlist, ")]")
            )
          )
          .then(async (el) => {
            await driver.actions().click(el).perform();
          });

        await driver.sleep(5000); // wait for the page to load
      }
    );

    then(
      "a chart of {symbol_from_watchlist} is displayed",
      async (symbol_from_watchlist) => {
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

        expect(ticker).toBe(symbol_from_watchlist);

        await driver.quit();
      }
    );
  });
});
