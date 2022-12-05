Feature: Change symbol in market chart
    As a user
    I would like to change symbol displayed in the market chart
    To analyze the symbol's chart

  Scenario: Change symbol in the chart
    Given the Home page is displaying a chart of AAPL by default
    When the User enters TSLA as the new symbol to display on the chart
    Then the chart now displays a chart of TSLA

  Scenario: Attempt to change the symbol in the chart to an invalid symbol
    Given the Home page is displaying a chart of AAPL by default
    When the User enters SOMEINVALIDSYMBOL as the symbol to display in the chart
    Then an Invalid symbol error message shall be displayed on the chart
