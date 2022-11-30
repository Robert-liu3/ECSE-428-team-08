Feature: Display and favorite news

  Scenario Outline: Get news about different companies
    When the user asks for news about <company>
    Then the user should receive news about <company>

    Examples:
      | company |
      | Google  |
      | Twitter |