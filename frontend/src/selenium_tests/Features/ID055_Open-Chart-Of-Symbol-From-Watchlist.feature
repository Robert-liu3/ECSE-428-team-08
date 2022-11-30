Feature: 
As a user
I want to open a symbol's chart right from the watchlist 
So that I get quicker access to the charts of my most consulted symbols

  Scenario: Open the chart of a symbol in the watchlist
    Given the watchlist is open and displayed to the user
    When the User selects NQ1! from the watchlist
    Then a chart of NQ1! is displayed
