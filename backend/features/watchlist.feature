Feature: WatchList

Scenario: Add Stock to WatchList

    # Add when single entries exist
    Given a user exists with id "Noah2"
    When the user with id "Noah2" adds a new stock with ticker "aapl"
    Then the user with id "Noah2" shall have the ticker "aapl" in their watchList

Scenario: Remove Stock from WatchList

    # Remove when single entry exists
    Given a user exists with id "Noah2"
    When the user with id "Noah2" removes the stock with ticker "aapl"
    Then the user with id "Noah2" shall not have "aapl" in their watchList
