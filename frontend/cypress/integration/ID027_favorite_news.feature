Feature: Favorite a news articles
As a user
I would like to favorite a news article
To be able to find it later

Background:
Given a user is on the news page

Scenario: Favorite an article and it appears on the favorites list
When a user clicks on the heart
Then the heart should be red

Scenario: Favorite an article and it appears on the favorites list
When a user clicks on the heart
Then news article will appear on the favorites list

Scenario: Favorite an article and it is added to the favorites list
When a user clicks on the heart
Then news article will be added to the favorites list

Scenario: Does not favorite an article and it doesn't appears on the sidebar
When a user does not click on the heart
Then no news will show up on the favorites list