const scraperService = require('../services/scraper.service');

const getContent = async (req, res) => {
    try {
        console.log("Received a request in getContent route handler");


        const articles = await scraperService.scrapeContent('https://deadspin.com/');


        res.json(articles);
    } catch (error) {
        console.error("Error in getContent route handler:", error);
        res.status(500).json({ error: error.message });
    }
};

const nflArticles = async (req, res) => {
    try {

        const footballArticles = await scraperService.scrapeContent('https://deadspin.com/football');

        res.json(footballArticles);
    } catch (error) {
        console.error("Error in getContent route handler:", error);
        res.status(500).json({ error: error.message });
    }

};

const mlbArticles = async (req, res) => {
    try {

        const baseballArticles = await scraperService.scrapeContent('https://deadspin.com/baseball/mlb');

        res.json(baseballArticles);
    } catch (error) {
        console.error("Error in getContent route handler:", error);
        res.status(500).json({ error: error.message });
    }

};

module.exports = {
    getContent,
    nflArticles,
    mlbArticles
};
