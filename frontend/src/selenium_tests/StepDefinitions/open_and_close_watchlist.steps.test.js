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
  "./src/selenium_tests/Features/ID054_Open-Close-Market-Watchlist.feature"
);

jestCucumber.defineFeature(feature, (test) => {
  // TEST 1: Load watchlist when navigating to Home Page
  test("Load watchlist when navigating to Home Page", async ({
    given,
    when,
    then,
  }) => {
    let driver;

    given("the customer is on the Home Page of the website", async () => {
      driver = await setupChromeDriver();
    });

    when("the Home Page loads itself", async () => {
      driver.sleep(1000);
    });

    then(
      "the watchlist is displayed to the User besides the chart",
      async () => {
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

        // Check if watchlist is open
        await driver
          .wait(
            until.elementLocated(
              By.xpath("//div[contains(text(), 'Watchlist')]")
            )
          )
          .then(async (el) => {
            let watchlistName = await el.getText();
            expect(watchlistName).toBe("Watchlist"); // Verify that the name of the watchlist is "Watchlist". If correct, then the watchlist element is present on the page.
          });

        await driver.quit();
      }
    );
  });

  // TEST 2: Close the watchlist
  test("Close the watchlist", async ({ given, when, then }) => {
    let driver;

    given("the watchlist is open", async () => {
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

      // Check if watchlist is open
      await driver
        .wait(
          until.elementLocated(By.xpath("//div[contains(text(), 'Watchlist')]"))
        )
        .then(async (el) => {
          let watchlistName = await el.getText();
          expect(watchlistName).toBe("Watchlist"); // Verify that the name of the watchlist is "Watchlist". If correct, then the watchlist element is present on the page.
        });
    });

    when("I close the watchlist", async () => {
      // Click the watchlist open-close button to close the watchlist
      await driver
        .wait(
          until.elementLocated(
            By.xpath("//div[starts-with(@class, 'hoverMask-')]")
          )
        )
        .then(async (el) => {
          await driver.actions().click(el).perform(); // Close watchlist
        });
      await driver.sleep(2000); // wait for the page to process the click
    });

    then(
      "the watchlist is closed and is not seen anymore by the User",
      async () => {
        // Test if watchlist is closed now
        let isWatchlistClosed;
        try {
          isWatchlistClosed = false;

          await driver.findElement(
            By.xpath("//div[contains(text(), 'Watchlist')]")
          ); // will throw an error if watchlist element is not found
        } catch (err) {
          isWatchlistClosed = true; // the watchlist element was not found, thus we deduce that the watchlist element was closed
        }
        expect(isWatchlistClosed).toBe(true);
        await driver.quit();
      }
    );
  });
  // TEST 3: Close and reopen the watchlist
  test("Close and reopen the watchlist", async ({ given, when, then }) => {
    let driver;

    given("the watchlist is open", async () => {
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

      // Check if watchlist is open
      await driver
        .wait(
          until.elementLocated(By.xpath("//div[contains(text(), 'Watchlist')]"))
        )
        .then(async (el) => {
          let watchlistName = await el.getText();
          expect(watchlistName).toBe("Watchlist"); // Verify that the name of the watchlist is "Watchlist". If correct, then the watchlist element is present on the page.
        });
    });

    when("I close the watchlist", async () => {
      // Click the watchlist open-close button to close the watchlist
      await driver
        .wait(
          until.elementLocated(
            By.xpath("//div[starts-with(@class, 'hoverMask-')]")
          )
        )
        .then(async (el) => {
          await driver.actions().click(el).perform(); // Close watchlist
        });

      await driver.sleep(2000); // wait for the page to process the click

      // Verify that the watchlist is closed now
      let isWatchlistClosed;
      try {
        isWatchlistClosed = false;

        await driver.findElement(
          By.xpath("//div[contains(text(), 'Watchlist')]")
        ); // will throw an error if watchlist element is not found
      } catch (err) {
        isWatchlistClosed = true; // the watchlist element was not found, thus we deduce that the watchlist element was closed
      }
      expect(isWatchlistClosed).toBe(true);
    });

    when("I open the watchlist again", async () => {
      // Click the watchlist open-close button to reopen the watchlist
      await driver
        .wait(
          until.elementLocated(
            By.xpath("//div[starts-with(@class, 'hoverMask-')]")
          )
        )
        .then(async (el) => {
          await driver.actions().click(el).perform(); // Open watchlist
        });

      driver.sleep(2000); // wait 1 sec to make sure that the watchlist had enough time to be opened
    });

    then("the watchlist is displayed besides the chart again", async () => {
      // Verify that the watchlist is open again
      let isWatchlistOpen = false;
      await driver
        .wait(
          until.elementLocated(By.xpath("//div[contains(text(), 'Watchlist')]"))
        )
        .then(async (el) => {
          let watchlistName = await el.getText();

          if (watchlistName === "Watchlist") {
            // if we found a watchlist called "Watchlist", then we found the watchlist element.
            isWatchlistOpen = true;
          }
        });
      expect(isWatchlistOpen).toBe(true);

      await driver.quit();
    });
  });
});
