import { Router } from 'express';
import { getNews } from '../controllers/newsController.js'

const router = Router();

router.get('/news', getNews);

export default router;