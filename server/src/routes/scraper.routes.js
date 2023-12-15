import express from 'express';
import { getContent, nflArticles, mlbArticles } from '../controllers/scraper.controller.js';
import axios from 'axios';

const scraperRouter = express.Router();

// Define a route to scrape general content
scraperRouter.get('/', getContent);

// Define a route to scrape football articles
scraperRouter.get('/football', nflArticles);
scraperRouter.get('/baseball', mlbArticles);

scraperRouter.get('/standings', async (req, res) => {
    try {
        const response = await axios.get('https://www.nba.com/standings');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching NBA standings', error: error.message });
    }
});
export default scraperRouter;
