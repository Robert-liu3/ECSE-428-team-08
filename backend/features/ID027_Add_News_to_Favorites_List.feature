Feature: Add news to favorites

  @AddNewsTest
  Scenario: Favorite a news article
    Given a user with username "olaabi" exists
    When the user favorites an article with "Is water wet?" and "https://www.newsArticles.com/is-water-wet"
    Then the user should have a new article in their bookmarks