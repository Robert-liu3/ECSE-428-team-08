Feature: Search bar for news articles
As a user
I would like a search bar to find news articles
To find specific news articles

Background:
Given a user is on the news page

Scenario: Visit page and searches proper news
When a user types a news titled "stocks"
Then news related to the title will show up

Scenario: Visit page and searches inproper news
When a user types a news titled "NonSenseNewsTitleWhichWillNeverExistInTheHistoryOfTheWorld"
Then no news will show up
