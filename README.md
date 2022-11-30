# ECSE-428-team-08

To run the application locally, first install the latest version of [Node.js](https://nodejs.org/en/download/).

Then, `cd` into `frontend` and run the command `npm start`.


Please always merge dev into your working branch to keep up to date with what is currently working.

## Other installations:

FOR NAVBAR:

in ./frontend
npm install react-router-dom --save

FOR NEWS:

in ./frontend
npm install newsapi --save

FOR CHARTS:

in ./frontend
npm -i react-tradingview-embed

or 

npm install --save react-tradingview-embed


FOR TESTING

in either ./frontend or ./backend depending on which section is testing
npm install start-server-and-test

&&

testing backend

in ./backend

npm install --save-dev jest

npm install supertest

npm install @cucumber/cucumber

Also make sure the backend is running before running the test command for the Gherkin scenarios.

testing frontend

in ./frontend

npm install --save-dev cypress

npm run cypress:open