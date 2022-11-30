import assert from 'assert'
import {Given, When, Then, After} from '@cucumber/cucumber'
import axios from 'axios'

//////// USER ////////
// correct username and password
When("user {string} enters password with {string}", async function (userName, pass) {
  this.username = userName;
  this.password = pass;
  this.loginResponse = await axios.get(`http://localhost:5000/login/${this.username}/${this.password}`);
});

Then("user is {string}", async function (response) {
  assert.equal(this.loginResponse.data,response)
});

//wrong username but right password
When("wrong user {string} enters right password {string} for another user in the system", async function (userName, pass) {
  this.username = userName;
  this.password = pass;
  this.loginResponse = await axios.get(`http://localhost:5000/login/${this.username}/${this.password}`);
});

Then("wrong user gets {string}", async function (response){
  assert.equal(this.loginResponse.data,response)
});


//wrong password but right username›
When("user {string} enters wrong password with {string}", async function (userName, pass) {
  this.username = userName;
  this.password = pass;
  this.loginResponse = await axios.get(`http://localhost:5000/login/${this.username}/${this.password}`);
});

Then("user gets {string}", async function (response){
  assert.equal(this.loginResponse.data,response)
});

When("user inputs first name {string}, last name {string}, email {string}, taken username {string}, and password {string} in the correct fields of the sign up page", async function(firstName, lastName, email, username, password){
  this.signUpResponse = await axios.post(`http://localhost:5000/createUser`,{firstName: firstName, lastName: lastName, email: email, _id: username, password: password});
  console.log(this.signUpResponse)
});

Then("previously used username user created gets {string}", async function (response){
  assert.equal(this.signUpResponse.data,response)
});

When("user inputs first name {string}, last name {string}, empty email, username {string}, and password {string} in the correct fields of the sign up page", async function(firstName, lastName, username, password){
  this.signUpResponse = await axios.post(`http://localhost:5000/createUser`,{data: {firstName: firstName, lastName: lastName, _id: username, password: password}});
});

Then("the field {string}", async function (response){
  assert.equal(this.signUpResponse.data,response)
});

/// Watchlist ///

Given("a user exists with id {string}", async function (string) {
  this.userResponse = await axios.get(
      `http://localhost:5000/getUser/${string}`
  );
  assert.equal(this.userResponse?.data?._id, string);
});

When(
    "the user with id {string} adds a new stock with ticker {string}",
    async function (string, string2) {
      try {
        this.userResponse = await axios.post(
            `http://localhost:5000/addToWatchList/${string}/${string2}`
        );
      } catch (err) {
        console.log("HEREHRERE");
        console.log(this.userResponse.data);
        console.log(err);
      }
    }
);

Then(
    "the user with id {string} shall have the ticker {string} in their watchList",
    async function (string, string2) {
      this.userResponse = await axios.get(
          `http://localhost:5000/getUser/${string}`
      );
      let found = false;
      console.log(
          "LENGTHLEHTNLEHTN: " + this.userResponse?.data?.watchList?.length
      );
      for (let i = 0; i < this.userResponse?.data?.watchList?.length; i++) {
        if (this.userResponse?.data?.watchList[i] === string2) {
          found = true;
        }
      }
      assert.equal(found, true);
    }
);

When(
    "the user with id {string} removes the stock with ticker {string}",
    async function (string, string2) {
      this.userResponse = await axios.delete(
          `http://localhost:5000/removeFromWatchList/${string}/${string2}`
      );
    }
);

Then(
    "the user with id {string} shall not have {string} in their watchList",
    function (string, string2) {
      let found = false;
      for (const stock of this.userResponse?.data?.watchList) {
        if (stock === string2) {
          found = true;
        }
      }
      assert.equal(found, false);
    }
);

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
Given(/^a user with username "([^"]*)" and email "([^"]*)" exists$/, async function (username, email) {
    await axios.post('http://localhost:5000/createUser', { _id: username, email: email })
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