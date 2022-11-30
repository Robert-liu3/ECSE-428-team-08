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
