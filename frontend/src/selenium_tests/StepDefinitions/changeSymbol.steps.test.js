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
  'Features/ID002_change_symbol_in_market_chart.feature'
);

console.log("Feature file:", feature);

jestCucumber.defineFeature(feature, (test) => {
  let driver;
  // Configure the background for the scenarios
  const givenAAPLisDisplayedOnTheChart = (given) => {
    given(
      "the Home page is displaying a chart of AAPL by default",
      async () => {
        driver = await setupChromeDriver();

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

        // Verify that AAPL is the symbol that is currently being displayed in the chart
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

        expect(ticker).toBe("AAPL");
      }
    );
  };

  test("changeSymbol", async ({ given, when, then }) => {
    givenAAPLisDisplayedOnTheChart(given); // execute the Background

    when(
      "the User enters {new_symbol} as the symbol to display in the chart",
      async (new_symbol) => {
        // Get the search bar field and click on it
        await driver
          .wait(
            until.elementIsVisible(
              driver.findElement(
                By.xpath(
                  "//div[starts-with(@id,'header-toolbar-symbol-search')]"
                )
              )
            )
          )
          .then(async (el) => {
            await driver.actions().click(el).perform();
          });

        // Change the ticker symbol by entering a new symbol in the symbol search bar
        let inputElement = await driver.findElement(
          By.xpath("//input[starts-with(@class,'search-')]")
        );
        await inputElement.sendKeys(new_symbol, Key.RETURN);
        await driver.sleep(5000); // wait for the page to load
      }
    );

    then(
      "the chart now displays a chart of {new_symbol}",
      async (new_symbol) => {
        // Verify that the correct ticker symbol has been set
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
        expect(ticker).toBe(new_symbol);
      }
    );

    await driver.quit();
  });

  test("searchInvalidSymbol", async ({ given, when, then }) => {
    givenAAPLisDisplayedOnTheChart(given); // execute the Background

    when(
      "the User enters {invalid_symbol} as the symbol to display in the chart",
      async (invalid_symbol) => {
        // Get the search bar field and click on it
        await driver
          .wait(
            until.elementIsVisible(
              driver.findElement(
                By.xpath(
                  "//div[starts-with(@id,'header-toolbar-symbol-search')]"
                )
              )
            )
          )
          .then(async (el) => {
            await driver.actions().click(el).perform();
          });

        // Enter an invalid market symbol into the symbol search bar
        let inputElement = await driver.findElement(
          By.xpath("//input[starts-with(@class,'search-')]")
        );
        await inputElement.sendKeys(invalid_symbol, Key.RETURN);
        await driver.sleep(5000); // wait for the page to load
      }
    );

    then(
      "an {error_message} error message shall be displayed on the chart",
      async (error_message) => {
        // Verify that the correct error message is displayed after entering an invalid symbol in the symbol search bar
        let errorMessage;
        await driver
          .wait(
            until.elementIsVisible(
              driver.findElement(
                By.xpath("//div[starts-with(@class,'errorCard__message')]")
              )
            )
          )
          .then(async (el) => {
            errorMessage = await el.getText();
          });
        expect(errorMessage).toBe(error_message); // Check if error message was displayed
      }
    );

    await driver.quit();
  });
});
