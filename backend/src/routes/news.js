import { Router } from 'express';
import {
    getNews,
    addFavNews,
    getAllArticles,
} from '../controllers/newsController.js'

const router = Router();

// Retrieves news based on category and query from newsapi
router.get('/getNews', getNews);

// Create an article bookmark and add to user account
router.post('/addFavNews', addFavNews);

// Get all articles in the database
router.get('/getAllArticles', getAllArticles);

export default router;


