const assert = require('assert')
const { When, Then } = require('@cucumber/cucumber')
const { Greeter } = require('../../src')

When('the greeter says hello', function () {
  this.whatIHeard = new Greeter().sayHello()
  return 'pending';
});

Then('I should have heard {string}', function (string) {
  assert.equal(this.whatIHeard, expectedResponse)
  return 'pending';
});


// When('the greeter says hello', function () {
//   this.whatIHeard = new Greeter().sayHello()
// });

// Then('I should have heard {string}', function (expectedResponse) {
//   assert.equal(this.whatIHeard, expectedResponse)
// });