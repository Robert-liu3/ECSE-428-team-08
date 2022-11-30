import assert from 'assert'
import {When,Then} from '@cucumber/cucumber'
import axios from 'axios';
// const assert = require('assert')
// const { When, Then } = require('@cucumber/cucumber')
// const { Greeter } = require('../../src')

//////// .  USEER /////

// correct username and password
When("user {string} enters password with {string}", async function (userName, pass) {
// loginResponse = await axios.get('http://localhost:5000/login/Noah2/123');

this.username = userName;
this.password = pass;
this.loginResponse = await axios.get(`http://localhost:5000/login/${this.username}/${this.password}`);



});

Then("user is {string}", async function (response){

assert.equal(this.loginResponse.data,response)


});

//wrong username but right password
When("wrong user {string} enters right password {string} for another user in the system", async function (userName, pass) {
  // loginResponse = await axios.get('http://localhost:5000/login/Noah2/123');

  this.username = userName;
  this.password = pass;
  this.loginResponse = await axios.get(`http://localhost:5000/login/${this.username}/${this.password}`);

  });
  
  Then("wrong user gets {string}", async function (response){

  assert.equal(this.loginResponse.data,response)
  
  
  
    
  });


//wrong password but right username›
When("user {string} enters wrong password with {string}", async function (userName, pass) {
  // loginResponse = await axios.get('http://localhost:5000/login/Noah2/123');
 
  this.username = userName;
  this.password = pass;
  this.loginResponse = await axios.get(`http://localhost:5000/login/${this.username}/${this.password}`);
  
  
  });
  
  Then("user gets {string}", async function (response){

  assert.equal(this.loginResponse.data,response)
  
  });

When("user inputs first name {string}, last name {string}, email {string}, username {string}, and password {string} in the correct fields of the sign up page", async function (firstName, lastName, email, username, password) {
  try{
    this.signUpResponse = await axios.post(`http://localhost:5000/createUser`,{data: {firstName: firstName, lastName: lastName, email: email, _id: username, password: password}});
  }
  catch (err){
    console.log(this.signUpResponse +err)
  }
});

  Then("new user gets {string}", async function (response){
    try{
      assert.equal(this.signUpResponse.data,response)
    }
    catch(err){
      console.log(this.signUpResponse + err)
    }
  });

When("user inputs first name {string}, last name {string}, email {string}, taken username {string}, and password {string} in the correct fields of the sign up page", async function(firstName, lastName, email, username, password){
  try{
    this.signUpResponse = await axios.post(`http://localhost:5000/createUser`,{data: {firstName: firstName, lastName: lastName, email: email, _id: username, password: password}});
  }
  catch (err){
    console.log(this.signUpResponse +err)
  }
});

  Then("previously used username user created gets {string}", async function (response){
    try{
      assert.equal(this.signUpResponse.data,response)
    }
    catch(err){
      console.log(this.signUpResponse + err)
    }
  });

When("user inputs first name {string}, last name {string}, taken email {string}, username {string}, and password {string} in the correct fields of the sign up page", async function(firstName, lastName, email, username, password){
  try{
    this.signUpResponse = await axios.post(`http://localhost:5000/createUser`,{data: {firstName: firstName, lastName: lastName, email: email, _id: username, password: password}});
  }
  catch (err){
    console.log(this.signUpResponse +err)
  }
});
  
  Then("previously used email user created gets {string}", async function (response){
    try{
      assert.equal(this.signUpResponse.data,response)
    }
    catch(err){
      console.log(this.signUpResponse + err)
    }
  });
  
  








