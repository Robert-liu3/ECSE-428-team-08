Feature: Change symbol in market chart
    As a user
    I would like to change symbol displayed in the market chart
    To analyze the symbol's chart

  Background: 
    Given the Home page is displaying a chart of AAPL by default

  Scenario: Change symbol in the chart
    When the User enters "TSLA" as the new symbol to display on the chart
    Then the chart now displays a chart of "TSLA"

  Scenario: Attempt to change the symbol in the chart to an invalid symbol
    When the User enters "SOMEINVALIDSYMBOL" as the symbol to display in the chart
    Then an "Invalid symbol" error message shall be displayed on the chart
