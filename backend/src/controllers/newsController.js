import NewsAPI from "newsapi"
import NewsArticle from "../models/NewsArticle.js"
const newsapi = new NewsAPI('4e01875ffe8c42ef878ccd83a054fd00');

// Uses newsapi to retrieve top headlines
// Requires query param, optional for category and sources; used for filtering
export const getNews = async (req, res) => {
    let articles = {};
    try {
        // Get articles from API based on query and optional category or sources
        // Note that sources and category can't be used together
        await newsapi.v2.topHeadlines({
            q: req.query['query'],
            category: req.query['category'],
            sources: req.query['sources'],
            language: 'en',
        }).then(response => {
            articles = response;
        });

        res.json({ articles });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Creates a new article if it does not exist in database
export const createArticle = async (req, res) => {
    const articleInfo = {
        title: req.query['title'],
        description: req.query['description'],
        body: req.query['body'],
        author: req.query['author'],
        url: req.query['url'],
        imageUrl: req.query['imageUrl']
    }

    // Check if article exists with matching title and url
    const article = await NewsArticle.findOneAndUpdate({
        title: articleInfo.title,
        url: articleInfo.url
    },{
        $setOnInsert: articleInfo
    }, {upsert: true})


    res.json("New article created!")
    return article;
}

// Takes in the id of user, and article id
// Then adds the article bookmark to the requested user
export const addFavNews = async (req, res) => {


}

// Retrieves articles currently in the database
export const getAllArticles = async (req,res) => {
    NewsArticle.find({}, )
      .then(articles => res.json(articles))
      .catch(err => res.json("Error: Not found " + err))
  
  
  };