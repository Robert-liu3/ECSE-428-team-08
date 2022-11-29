import assert from 'assert'
import {When,Then} from '@cucumber/cucumber'
import {Greeter} from '../src/Greeter.js'

// const assert = require('assert')
// const { When, Then } = require('@cucumber/cucumber')
// const { Greeter } = require('../../src')



//////// .  USEER /////

var whatIHeard

When('the greeter says hello', function () {
  let greeter = new Greeter()
  console.log(greeter.sayHello())
  whatIHeard =  greeter.sayHello()
  return "IT workds"
});

Then('I should have heard {string}', function (expectedResponse) {
  assert.equal(whatIHeard, expectedResponse)
});




////// NEWS ////////


