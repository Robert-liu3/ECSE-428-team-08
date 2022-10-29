// require('chromedriver');
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')

const screen = {
    width: 640,
    height: 480
  };

const run_chart_tests = async () => {
    let driver = await new Builder().forBrowser('chrome')
                                    .setChromeOptions(new chrome.Options().headless().windowSize(screen))
                                    .build();

    await driver.get("http:/www.google.com");

    var promise = driver.getTitle();

    promise.then(function(title) 

    {

    console.log(title);

    });

    await driver.quit();
}

run_chart_tests()