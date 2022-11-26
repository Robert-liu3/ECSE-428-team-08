import NewsAPI from "newsapi"
import NewsArticle from "../models/NewsArticle.js"
import user from "../models/user.js";
import ArticleBookmark from "../models/ArticleBookmark.js";

const newsapi = new NewsAPI('4e01875ffe8c42ef878ccd83a054fd00');

// Uses newsapi to retrieve top headlines
// Requires query param, optional for category and sources; used for filtering
export const getNewsFromAPI = async (req, res) => {
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

// Helper method to create a new article if it does not exist in database
// Article info should include title, url, body, description, and imageUrl
const createArticle = async (articleInfo) => {
    // Check if article exists with matching title and url
    await NewsArticle.findOneAndUpdate({
        title: articleInfo.title,
        url: articleInfo.url
    }, {
        $setOnInsert: articleInfo
    }, {upsert: true});
}

// Takes in the id of user, and article info
// Then adds the article bookmark to the requested user
export const addFavNews = async (req, res) => {
    const articleInfo = {
        title: req.query['title'],
        description: req.query['description'],
        body: req.query['body'],
        author: req.query['author'],
        url: req.query['url'],
        imageUrl: req.query['imageUrl'],
    }
    const userId = req.query['userId'];

    // Create and store article in database if it doesn't exist yet
    await createArticle(articleInfo);
    const articleToFind = await NewsArticle.findOne({title: req.query['title'], url: req.query['url']}); // find the article needed

    // Get the user with provided id and verify they are not null
    const userToUpdate = await user.findById(userId);

    if (userToUpdate === null) res.json("Error: could not find a user with the provided id.");
    else {
        // Create a bookmark and then add it to the user's list
        const articleBookmark = await ArticleBookmark.create({ newsArticle: articleToFind });

        userToUpdate.addFavouriteArticle(articleBookmark);
        res.json(userToUpdate);
        console.log("Article successfully added.");
    }
}

// Provided user id and article bookmark id
export const removeFavNews = async (req, res) => {
    // Get user by id first
    const userToUpdate = await user.findById(req.query['userId']);

    if (userToUpdate === null) res.json("Error: could not find a user with the provided id.");
    else {
       const articleBookmarkToRemove = await ArticleBookmark.findById(req.query['articleToRemoveId']);
       if (articleBookmarkToRemove === null) res.json("Error: could not find the article bookmark to remove.");
       else {
           // Remove references of article bookmark
           userToUpdate.removeFavouriteArticle(articleBookmarkToRemove._id);
           await ArticleBookmark.findByIdAndDelete(articleBookmarkToRemove._id);
           res.json(userToUpdate);
           console.log("Article successfully removed.");
       }
    }
}

// Retrieves articles currently in the database (used mainly for debugging)
export const getAllArticles = async (req, res) => {
    NewsArticle.find({})
      .then(articles => res.json(articles))
      .catch(err => res.json("Error: " + err))
};

export const getArticlesByUser = async (req, res) => {
    const inputUser = await user.findById(req.query['userId'])
    let likedArticles = [];

    if (inputUser === null) return null;

    // Push each article into an array
    for (let i = 0; i < inputUser.likedArticles.length; i++) {
        const bmId = inputUser.likedArticles[i]
        const articleBm = await ArticleBookmark.findById(bmId);
        const article = await NewsArticle.findById(articleBm.newsArticle);
        likedArticles.push(article);
    }

    res.json(likedArticles);
    return inputUser.likedArticles;
}

//clears the database, might be used to as a clear function for bookmarks later on
export const clearArticles = async (req, res) => {

    NewsArticle.deleteMany({}).then(function() {
        res.json("Articles deleted in database.");
    }).catch(function(error){
        res.json(error);
    });

};