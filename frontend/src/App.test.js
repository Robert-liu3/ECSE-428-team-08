const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");
const jestSetup = require("./jest.setup");

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

test("getTicker", async () => {
  let driver = await setupChromeDriver();

  await driver.wait(
    until.elementLocated(By.xpath("//iframe[starts-with(@id,'tradingview_')]"))
  );

  await driver
    .switchTo()
    .frame(
      driver.findElement(By.xpath("//iframe[starts-with(@id,'tradingview_')]"))
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

  expect(ticker).toBe("AAPL");

  await driver.quit();
});

test("changeTicker", async () => {
  let driver = await setupChromeDriver();

  await driver.wait(
    until.elementLocated(By.xpath("//iframe[starts-with(@id,'tradingview_')]"))
  );
  await driver
    .switchTo()
    .frame(
      driver.findElement(By.xpath("//iframe[starts-with(@id,'tradingview_')]"))
    );

  // Get the search bar field and click on it
  await driver
    .wait(
      until.elementIsVisible(
        driver.findElement(
          By.xpath("//div[starts-with(@id,'header-toolbar-symbol-search')]")
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

test("searchInvalidSymbol", async () => {
  let driver = await setupChromeDriver();

  await driver.wait(
    until.elementLocated(By.xpath("//iframe[starts-with(@id,'tradingview_')]"))
  );
  await driver
    .switchTo()
    .frame(
      driver.findElement(By.xpath("//iframe[starts-with(@id,'tradingview_')]"))
    );

  // Get the search bar field and click on it
  await driver
    .wait(
      until.elementIsVisible(
        driver.findElement(
          By.xpath("//div[starts-with(@id,'header-toolbar-symbol-search')]")
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
  await inputElement.sendKeys("SOME_BAD_SYMBOL", Key.RETURN);
  await driver.sleep(5000); // wait for the page to load

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
  expect(ticker).toBe("SOME_BAD_SYMBOL");

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
});

test("selectSymbolFromWatchlist", async () => {
  let driver = await setupChromeDriver();

  // Enter the chart frame
  await driver.wait(
    until.elementLocated(By.xpath("//iframe[starts-with(@id,'tradingview_')]"))
  );
  await driver
    .switchTo()
    .frame(
      driver.findElement(By.xpath("//iframe[starts-with(@id,'tradingview_')]"))
    );

  // Get the watchlist
  await driver
    .wait(until.elementLocated(By.xpath("//span[contains(text(), 'NQ1!')]")))
    .then(async (el) => {
      await driver.actions().click(el).perform();
    });

  await driver.sleep(5000); // wait for the page to load

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

test("closeWatchlist", async () => {
  let driver = await setupChromeDriver();

  // Enter the chart frame
  await driver.wait(
    until.elementLocated(By.xpath("//iframe[starts-with(@id,'tradingview_')]"))
  );
  await driver
    .switchTo()
    .frame(
      driver.findElement(By.xpath("//iframe[starts-with(@id,'tradingview_')]"))
    );

  // Check if watchlist is open
  await driver
    .wait(
      until.elementLocated(By.xpath("//div[contains(text(), 'Watchlist')]"))
    )
    .then(async (el) => {
      let watchlistName = await el.getText();
      console.log("Found watchlist text 1:", await el.getText());
      expect(watchlistName).toBe("Watchlist");
    });

  // Click the watchlist open-close button to close the watchlist
  await driver
    .wait(
      until.elementLocated(By.xpath("//div[starts-with(@class, 'hoverMask-')]"))
    )
    .then(async (el) => {
      await driver.actions().click(el).perform(); // Close watchlist
    });

  await driver.sleep(2000); // wait for the page to process the click

  // Test if watchlist is closed now
  let isWatchlistClosed;
  try {
    isWatchlistClosed = false;

    await driver.findElement(By.xpath("//div[contains(text(), 'Watchlist')]")); // will throw an error if watchlist element is not found
  } catch (err) {
    isWatchlistClosed = true; // the watchlist element was not found, thus we deduce that the watchlist element was closed
  }
  expect(isWatchlistClosed).toBe(true);

  await driver.quit();
});

test("reopenWatchlist", async () => {
  let driver = await setupChromeDriver();

  // Enter the chart frame
  await driver.wait(
    until.elementLocated(By.xpath("//iframe[starts-with(@id,'tradingview_')]"))
  );
  await driver
    .switchTo()
    .frame(
      driver.findElement(By.xpath("//iframe[starts-with(@id,'tradingview_')]"))
    );

  // Check if the watchlist is open
  await driver
    .wait(
      until.elementLocated(By.xpath("//div[contains(text(), 'Watchlist')]"))
    )
    .then(async (el) => {
      let watchlistName = await el.getText();
      console.log("Found watchlist text 2.1:", await el.getText());
      expect(watchlistName).toBe("Watchlist");
    });

  // Click the watchlist open-close button to close the watchlist
  await driver
    .wait(
      until.elementLocated(By.xpath("//div[starts-with(@class, 'hoverMask-')]"))
    )
    .then(async (el) => {
      await driver.actions().click(el).perform(); // Close watchlist
    });

  await driver.sleep(2000); // wait for the page to process the click

  // Test if the watchlist is closed now
  let isWatchlistClosed;
  try {
    isWatchlistClosed = false;

    await driver.findElement(By.xpath("//div[contains(text(), 'Watchlist')]")); // will throw an error if watchlist element is not found
  } catch (err) {
    isWatchlistClosed = true; // the watchlist element was not found, thus we deduce that the watchlist element was closed
  }
  expect(isWatchlistClosed).toBe(true);

  // Click the watchlist open-close button to reopen the watchlist
  await driver
    .wait(
      until.elementLocated(By.xpath("//div[starts-with(@class, 'hoverMask-')]"))
    )
    .then(async (el) => {
      await driver.actions().click(el).perform(); // Open watchlist
    });

  driver.sleep(2000); // wait 1 sec to make sure that the watchlist had enough time to be opened

  let isWatchlistOpen = false;
  await driver
    .wait(
      until.elementLocated(By.xpath("//div[contains(text(), 'Watchlist')]"))
    )
    .then(async (el) => {
      let watchlistName = await el.getText();
      console.log("Found watchlist text 2.2:", await el.getText());

      if (watchlistName === "Watchlist") {
        isWatchlistOpen = true;
      }
    });
  expect(isWatchlistOpen).toBe(true);

  await driver.quit();
});
