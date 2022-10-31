import { Router } from 'express';
import { getNews } from '../controllers/newsController.js'

const router = Router();

// Retrieves news based on category and query
router.get('/getNews', getNews);

export default router;