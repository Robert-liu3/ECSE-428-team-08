import NewsAPI from "newsapi"
import React, { useState } from 'react'

const newsapi = new NewsAPI('4e01875ffe8c42ef878ccd83a054fd00');

const [data, setData] = useState([])

function getNews() {
    newsapi.v2.topHeadlines({
        sources: 'bbc-news,the-verge',
        // q: 'bitcoin',
        // category: 'business',
        language: 'en',
        // country: 'us'
    }).then(response => {
        setData(response.data.articles);
    });

}

getNews();
console.log(data);
