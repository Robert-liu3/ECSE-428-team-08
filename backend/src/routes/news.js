import { Router } from 'express';
import { getNews } from '../controllers/newsController.js'

const router = Router();

router.get('/', getNews);

export default router;