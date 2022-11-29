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
try{
this.username = userName;
this.password = pass;
this.loginResponse = await axios.get(`http://localhost:5000/login/${this.username}/${this.password}`);
}
catch (err){
  console.log("dasdasdasdasd" +err)
}
});

Then("user is {string}", async function (response){
try{
assert.equal(this.loginResponse.data,response)
}

catch(err){
  console.log(this.loginResponse + err)
}
});

//wrong username but right password
When("wrong user {string} enters right password {string} for another user in the system", async function (userName, pass) {
  // loginResponse = await axios.get('http://localhost:5000/login/Noah2/123');
  try{
  this.username = userName;
  this.password = pass;
  this.loginResponse = await axios.get(`http://localhost:5000/login/${this.username}/${this.password}`);
  }
  catch (err){
    console.log("dasdasdasdasd" +err)
  }
  });
  
  Then("wrong user gets {string}", async function (response){
  try{
  assert.equal(this.loginResponse.data,response)
  }
  
  catch(err){
    console.log(this.loginResponse + err)
  }
  });


// wrong password but right username
When("user {string} enters wrong password with {string}", async function (userName, pass) {
  // loginResponse = await axios.get('http://localhost:5000/login/Noah2/123');
  try{
  this.username = userName;
  this.password = pass;
  this.loginResponse = await axios.get(`http://localhost:5000/login/${this.username}/${this.password}`);
  }
  catch (err){
    console.log("dasdasdasdasd" +err)
  }
  });
  
  Then("user gets {string}", async function (response){
  try{
  assert.equal(this.loginResponse.data,response)
  }
  
  catch(err){
    console.log(this.loginResponse + err)
  }
  });



  
  








