import { Router } from 'express';
import {
    getNewsFromAPI,
    addFavNews,
    getAllArticles,
    clearArticles,
    removeFavNews, getArticleBookmarksByUser
} from '../controllers/newsController.js'
import NewsArticle from "../models/NewsArticle.js";

const router = Router();

// Retrieves news based on category and query from newsapi
router.get('/getNews', getNewsFromAPI);

// Create an article bookmark and add to user account
router.post('/addFavNews', addFavNews);

// Remove an article bookmark from a user's account
router.delete('/removeFavNews', removeFavNews);

// Get all articles in the database
router.get('/getAllArticles', getAllArticles);

// Clear articles in database
router.delete('/clearArticles', clearArticles);

// Get article bookmarks by user
router.get("/getArticleBmsByUser", getArticleBookmarksByUser)

// Get article from bookmark
router.get("/getArticleFromBm", async (req, res) => {
    const articleBm = req.query['articleBm']
    if (articleBm === null || articleBm === undefined) return null;

    const article = await NewsArticle.findById(articleBm.newsArticle);
    res.json(article);
    return article;
})

export default router;


