Feature: Login

Scenario: tryna login
    Given user on page
    When user enters username "hi"
    Then user will get username "hi"