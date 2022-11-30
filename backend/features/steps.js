import assert from 'assert'
import {Given, When, Then, After} from '@cucumber/cucumber'
import axios from 'axios'


//////// USER ////////


//////// NEWS ////////

// Retrieve news from specific source
When(/^the user asks for news from the publisher (.*)$/, async function (source) {
  this.newsResponse = await axios.get("http://localhost:5000/news/getNews", {
    params: {
      query: "",
      sources: source
    }
  });
});

Then(/^the user should receive news by the publisher (.*)$/, function (publisher) {
  this.source = this.newsResponse.data.articles.articles[0].source;
  assert(this.source.name.includes(publisher))
});

// Favorite a news article
Given(/^a user with username "([^"]*)" exists$/, async function (username) {
  await axios.post('http://localhost:5000/createUser', {_id: username})
  this.userId = username;
});

When(/^the user favorites an article with (.*) and (.*)$/, async function (title, url) {
  await axios.post('http://localhost:5000/news/addFavNews', null, {
    params: {
      userId: this.userId,
      title: title,
      url: url
    }
  })
});

Then(/^the user should have a new article in their bookmarks$/, async function () {
  this.bookmarks = await axios.get("http://localhost:5000/news/getArticleBmsByUser", {
    params: {
      userId: this.userId
    }
  });
  assert.equal(this.bookmarks.data.length, 1);
});

After("@AddNewsTest", async function () {
  await axios.delete("http://localhost:5000/deleteUser", {
    params: {id: this.userId}
  })
})