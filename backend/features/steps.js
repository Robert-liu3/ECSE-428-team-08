import assert, { fail } from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import axios from "axios";

// const assert = require('assert')
// const { When, Then } = require('@cucumber/cucumber')
// const { Greeter } = require('../../src')

//////// .  USEER /////

// correct username and password
When(
  "user {string} enters password with {string}",
  async function (userName, pass) {
    // loginResponse = await axios.get('http://localhost:5000/login/Noah2/123');
    try {
      this.username = userName;
      this.password = pass;
      this.loginResponse = await axios.get(
        `http://localhost:5000/login/${this.username}/${this.password}`
      );
    } catch (err) {
      console.log("dasdasdasdasd" + err);
    }
  }
);

Then("user is {string}", async function (response) {
  try {
    assert.equal(this.loginResponse.data, response);
  } catch (err) {
    console.log(this.loginResponse + err);
  }
});

//wrong username but right password
When(
  "wrong user {string} enters right password {string} for another user in the system",
  async function (userName, pass) {
    // loginResponse = await axios.get('http://localhost:5000/login/Noah2/123');
    try {
      this.username = userName;
      this.password = pass;
      this.loginResponse = await axios.get(
        `http://localhost:5000/login/${this.username}/${this.password}`
      );
    } catch (err) {
      console.log("dasdasdasdasd" + err);
    }
  }
);

Then("wrong user gets {string}", async function (response) {
  try {
    assert.equal(this.loginResponse.data, response);
  } catch (err) {
    console.log(this.loginResponse + err);
  }
});

// wrong password but right username
When(
  "user {string} enters wrong password with {string}",
  async function (userName, pass) {
    // loginResponse = await axios.get('http://localhost:5000/login/Noah2/123');
    try {
      this.username = userName;
      this.password = pass;
      this.loginResponse = await axios.get(
        `http://localhost:5000/login/${this.username}/${this.password}`
      );
    } catch (err) {
      console.log("dasdasdasdasd" + err);
    }
  }
);

Then("user gets {string}", async function (response) {
  try {
    assert.equal(this.loginResponse.data, response);
  } catch (err) {
    console.log(this.loginResponse + err);
  }
});

When(
  "user inputs first name {string}, last name {string}, email {string}, username {string}, and password {string} in the correct fields of the sign up page",
  async function (firstName, lastName, email, username, password) {
    try {
      this.signUpResponse = await axios.post(
        `http://localhost:5000/createUser`,
        {
          data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            _id: username,
            password: password,
          },
        }
      );
    } catch (err) {
      console.log(this.signUpResponse + err);
    }
  }
);

Then("new user gets {string}", async function (response) {
  try {
    assert.equal(this.signUpResponse.data, response);
  } catch (err) {
    console.log(this.signUpResponse + err);
  }
});

When(
  "user inputs first name {string}, last name {string}, email {string}, taken username {string}, and password {string} in the correct fields of the sign up page",
  async function (firstName, lastName, email, username, password) {
    try {
      this.signUpResponse = await axios.post(
        `http://localhost:5000/createUser`,
        {
          data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            _id: username,
            password: password,
          },
        }
      );
    } catch (err) {
      console.log(this.signUpResponse + err);
    }
  }
);

Then(
  "previously used username user created gets {string}",
  async function (response) {
    try {
      assert.equal(this.signUpResponse.data, response);
    } catch (err) {
      console.log(this.signUpResponse + err);
    }
  }
);

When(
  "user inputs first name {string}, last name {string}, taken email {string}, username {string}, and password {string} in the correct fields of the sign up page",
  async function (firstName, lastName, email, username, password) {
    try {
      this.signUpResponse = await axios.post(
        `http://localhost:5000/createUser`,
        {
          data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            _id: username,
            password: password,
          },
        }
      );
    } catch (err) {
      console.log(this.signUpResponse + err);
    }
  }
);

Then(
  "previously used email user created gets {string}",
  async function (response) {
    try {
      assert.equal(this.signUpResponse.data, response);
    } catch (err) {
      console.log(this.signUpResponse + err);
    }
  }
);

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
