const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

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

  // The error is here. Possibly need to call the website in a different way
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

const run_chart_tests = async () => {
  // let driver = await new Builder().forBrowser('chrome')
  //                                 .setChromeOptions(new chrome.Options().headless().windowSize(screen_obj))
  //                                 .build();



  // await driver.get("http://localhost:3000/");
  let driver = setupChromeDriver();
  var title = await driver.getTitle();

  await driver.quit();

  return title;
}

test('charts hello', () => {
  console.log("Hello");

  expect(true).toBe(true);
});

test('charts', async() => {
  let title = await run_chart_tests();
  console.log(title);
  expect(title).toBe('React App');
});