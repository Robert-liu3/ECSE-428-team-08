const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
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
  "./src/selenium_tests/Features/ID002_Change_Symbol_in_Market_Chart.feature"
);

jestCucumber.defineFeature(feature, (test) => {
  test("Change symbol in the chart", ({ given, when, then }) => {
    let driver;

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

    when(
      "the User enters TSLA as the new symbol to display on the chart",
      async () => {
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
        await inputElement.sendKeys("TSLA", Key.RETURN);
        await driver.sleep(5000); // wait for the page to load
      }
    );

    then("the chart now displays a chart of TSLA", async () => {
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
      expect(ticker).toBe("TSLA");
      await driver.quit();
    });
  });

  test("Attempt to change the symbol in the chart to an invalid symbol", ({
    given,
    when,
    then,
  }) => {
    let driver;

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

    when(
      "the User enters SOMEINVALIDSYMBOL as the symbol to display in the chart",
      async () => {
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
        await inputElement.sendKeys("SOMEINVALIDSYMBOL", Key.RETURN);
        await driver.sleep(5000); // wait for the page to load
      }
    );

    then(
      "an Invalid symbol error message shall be displayed on the chart",
      async () => {
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
        expect(errorMessage).toBe("Invalid symbol"); // Check if error message was displayed
        await driver.quit();
      }
    );
  });
});
