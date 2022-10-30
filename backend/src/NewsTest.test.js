const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')


const app = require('./index') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

const screen_obj = {
    width: 640,
    height: 480
};

const run_news_tests = async () => {
    let driver = await new Builder().forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless().windowSize(screen_obj))
        .build();

    //await driver.get("http://localhost:5000/news");

    var news = await driver.get("http://localhost:5000/news");

    return news;

}

test('dummy', async () => {
    console.log("Hello");

    expect(true).toBe(true);
});

test('news', async () => {

    it('gets the test endpoint', async done => {
        const response = await request.get('/news')

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('pass!')
        done()
    })

  
});


