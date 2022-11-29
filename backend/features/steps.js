import assert from 'assert'
import {When,Then} from '@cucumber/cucumber'
import axios from 'axios'

//////// USER ////////


//////// NEWS ////////

// Retrieve news from newsapi
When(/^the user asks for news about (.*)$/, async function ( company ) {
  this.newsResponse = await axios.get("http://localhost:5000/news/getNews", {
    params: {
      query: company,
      category: "business"
    }
  });
});

Then(/^the user should receive news about (.*)$/, function (expected) {
  try {
    assert(this.newsResponse.data.articles.articles[0].title.includes(expected));
  } catch (err) {
    console.log(this.newsResponse.data.articles.articles[0].title)
    console.log(expected);
  }
});