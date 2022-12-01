Feature: Filter news by publisher

  Scenario Outline: Get news by a specific publisher
    When the user asks for news from the publisher <source>
    Then the user should receive news by the publisher <publisher>

    Examples:
      | source   | publisher |
      | bbc-news | BBC News  |
      | politico | Politico  |
      | reuters  | Reuters   |

