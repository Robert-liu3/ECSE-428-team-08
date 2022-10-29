require('chromedriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

let driver = new Builder().forBrowser('chrome').build();