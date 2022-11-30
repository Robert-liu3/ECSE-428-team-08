Feature: Visit the News Page
As a user
I would like to see the latest news
To stay updated on current news

Background:
Given a user is on the homepage

Scenario: Visit page and it loads the News Page
When a user clicks on the News tab
Then the user will be redirected to the News page

Scenario: Visit page and sees the latest news
When a user is on the news page
Then the user will see the latest news

Scenario: Visit page and sees the favorited news
When a user is on the news page
Then the user will see the favorited news
