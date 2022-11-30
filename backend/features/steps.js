import assert, { fail } from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import axios from "axios";
import { Greeter } from "../src/Greeter.js";
import { app } from "../src/index.js";
import request from "supertest";

// const assert = require('assert')
// const { When, Then } = require('@cucumber/cucumber')
// const { Greeter } = require('../../src')

//////// .  USEER /////

var whatIHeard;

When("the greeter says hello", function () {
  let greeter = new Greeter();
  console.log(greeter.sayHello());
  whatIHeard = greeter.sayHello();
  return "IT workds";
});

Then("I should have heard {string}", function (expectedResponse) {
  assert.equal(whatIHeard, expectedResponse);
});

////// NEWS ////////

////// WATCHLIST ////////

var user;

Given("a user exists with id {string}", async (id) => {
  const userResponse = await axios.get(`http://localhost:5000/getUser/${id}`);
  assert.equal(userResponse.statusCode, 200);
});

When(
  "the user with id {string} adds a new stock with ticker {string}",
  async (id, ticker) => {
    await axios.post(
      `http://localhost:5000/addStockToWatchList/${id}/${ticker}`
    );
  }
);

When(
  "the user with id {string} removes the stock with ticker {string}",
  async (id, ticker) => {
    await axios.delete(
      `http://localhost:5000/removeFromWatchList/${id}/${ticker}`
    );
  }
);

Then(
  "the user with id {string} shall have the ticker {string} in their watchList",
  async (id, ticker) => {
    const userResponse = await axios.get(`http://localhost:5000/getUser/${id}`);
    assert.equal(userResponse.statusCode, 200);
    let found = false;
    for (const stock of user?.watchList) {
      if (stock === ticker) {
        found = true;
      }
    }
    assert.equal(found, true);
  }
);

Then(
  "the user with id {string} shall not have {string} in their watchList",
  async (id, ticker) => {
    const userResponse = await axios.get(`http://localhost:5000/getUser/${id}`);
    assert.equal(userResponse.statusCode, 200);
    let found = false;
    for (const stock of user?.watchList) {
      if (stock === ticker) {
        found = true;
      }
    }
    assert.equal(found, false);
  }
);
