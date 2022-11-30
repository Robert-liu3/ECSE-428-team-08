Feature: Open Market Charts
As a Customer
I would like to open a market chart to the Stock Market System
To navigate the market

  Scenario Outline: Open Market Chart
    Given the customer is on the Home Page of the website
    When the Home Page loads itself
    Then a market chart of "AAPL" is displayed
