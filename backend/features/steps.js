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

async function call(API_CALL, type) {
  const out = null;
  switch (type) {
    case "get":
      out = await axios.get(API_CALL);
    case "post":
      out = await axios.post(API_CALL);
    case "delete":
      out = await axios.delete(API_CALL);
  }
  console.log(out);
  return out;
}

Given("a user exists with id {string}", function (string) {
  const userResponse = call(`http://localhost:5000/getUser/${string}`, "get");
  assert.equal(userResponse.statusCode, 200);
});

When(
  "the user with id {string} adds a new stock with ticker {string}",
  function (string, string2) {
    call(
      `http://localhost:5000/addStockToWatchList/${string}/${string2}`,
      "post"
    );
  }
);

Then(
  "the user with id {string} shall have the ticker {string} in their watchList",
  function (string, string2) {
    const userResponse = call(`http://localhost:5000/getUser/${string}`, "get");
    assert.equal(userResponse?.statusCode, 200);
    let found = false;
    for (const stock of user?.watchList) {
      if (stock === string2) {
        found = true;
      }
    }
    assert.equal(found, true);
  }
);

When(
  "the user with id {string} removes the stock with ticker {string}",
  function (string, string2) {
    call(
      `http://localhost:5000/removeFromWatchList/${string}/${string2}`,
      "delete"
    );
  }
);

Then(
  "the user with id {string} shall not have {string} in their watchList",
  function (string, string2) {
    const userResponse = call(`http://localhost:5000/getUser/${string}`, "get");
    assert.equal(userResponse.statusCode, 200);
    let found = false;
    for (const stock of user?.watchList) {
      if (stock === string2) {
        found = true;
      }
    }
    assert.equal(found, false);
  }
);
