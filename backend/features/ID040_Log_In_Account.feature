Feature: Log In Account
    As a user to the Stock Market System
    I would like to log in and access the Stock Market System
    So that I can view graphs and news, and access the general functionalities of the system.

    Scenario: Login of current user
    When user "Noah2" enters password with "123"
    Then user is "Correct Noah2"

    Scenario: Login of current user with wrong username but right password
    When wrong user "Noah123" enters right password "123" for another user in the system
    Then wrong user gets "Wrong password or Username"

    Scenario: Login of current user with right username but wrong password
    When user "Noah2" enters wrong password with "bad Password"
    Then user gets "Wrong password or Username"

