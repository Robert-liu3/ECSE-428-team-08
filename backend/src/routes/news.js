import { Router } from 'express';
import { getNews, addFavNews, getAllArticles,deleteAllArticles } from '../controllers/newsController.js'

const router = Router();

// Retrieves news based on category and query
router.get('/getNews', getNews);
router.post('/addFavNews', addFavNews);
router.get('/getAllArticles', getAllArticles);
router.delete('/deleteNews', deleteAllArticles);
export default router;


