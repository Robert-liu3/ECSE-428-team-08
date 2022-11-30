Feature: 
As a user
I would like to toggle open-close of my symbol watchlist
To maximize or minimize the space on the chart

  Scenario: Load watchlist when navigating to Home Page
    Given the customer is on the Home Page of the website
    When the Home Page loads itself
    Then the watchlist is displayed to the User besides the chart

  Scenario: Close the watchlist
    Given the watchlist is open
    When I close the watchlist
    Then the watchlist is closed and is not seen anymore by the User

  Scenario: Close and reopen the watchlist
    Given the watchlist is open
    When I close the watchlist
    And I open the watchlist again
    Then the watchlist is displayed besides the chart again
