import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('features/login.feature');

defineFeature(feature, test => {
    test('login', ({ given, when, then }) => {
        given('Given user on page', () => {
            console.log("user is on page");
        });
        when('When user enters username hi', () => {
            console.log("when statement");
        });
        then('Then user will get username hi', () => {

        });
    });
  });