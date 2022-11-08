import { Router } from 'express';
import {
    getNewsFromAPI,
    addFavNews,
    getAllArticles,
    clearArticles,
} from '../controllers/newsController.js'

const router = Router();

// Retrieves news based on category and query from newsapi
router.get('/getNews', getNewsFromAPI);

// Create an article bookmark and add to user account
router.post('/addFavNews', addFavNews);

// Get all articles in the database
router.get('/getAllArticles', getAllArticles);

//clear articles in database
router.delete('/clearArticles', clearArticles);

export default router;


