import { Router } from 'express';
import {
    getNewsFromAPI,
    addFavNews,
    getAllArticles,
    clearArticles,
    removeFavNews,
    getArticleBookmarksByUser,
    getArticleFromBm
} from '../controllers/newsController.js'

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
router.get("/getArticleFromBm", getArticleFromBm)

export default router;


