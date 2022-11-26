const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const jestSetup = require("./jest.setup");

const screen_obj = {
  width: 640,
  height: 480,
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
            "//div[starts-with(@id,'header-toolbar-symbol-search')]//div[starts-with(@class,'js-button-text text')]"
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

/*
  await driver.wait(
    until.elementIsVisible(
      driver.findElement(
        By.xpath("//div[starts-with(@class,'inputContainer-')]")
      )
    )
  ); */

  // Change the ticker symbol by entering a new symbol in the symbol search bar
  let inputElement = await driver.findElement(By.xpath("//input[starts-with(@class,'search-')]"))
  await inputElement.sendKeys("TSLA", Key.RETURN)
  await driver.sleep(5000) // wait for the page to load

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
  expect(ticker).toBe("TSLA");

  await driver.quit();
});
