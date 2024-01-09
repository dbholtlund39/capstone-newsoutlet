import express from 'express';
import { getContent, nflArticles, mlbArticles, nbaArticles } from '../controllers/scraper.controller.js';


const scraperRouter = express.Router();


scraperRouter.get('/', getContent);

scraperRouter.get('/football', nflArticles);
scraperRouter.get('/baseball', mlbArticles);
scraperRouter.get('/basketball', nbaArticles);

export default scraperRouter;
