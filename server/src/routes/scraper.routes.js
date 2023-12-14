import express from 'express';
import { getContent } from '../controllers/scraper.controller.js';

const scraperRouter = express.Router();

scraperRouter.get('/', getContent);

export default scraperRouter;