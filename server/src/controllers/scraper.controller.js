const scraperService = require('../services/scraper.service');


const commonElements = {
    articleSelector: '.js_post_item',
    titleSelector: 'h4',
    descriptionSelector: '.sc-1d3a351-0',
    linkSelector: '.js_link',
    imageSelector: 'img',
};

const nbaElements = {

    articleSelector: 'header.sc-1iva63p-0.bzGqrE.sc-1yaaa1s-2.guyGSe + .articles-container .article, .article',
    titleSelector: 'h2',
    descriptionSelector: 'p',
    linkSelector: 'a',
    imageSelector: 'img',
};




const getContent = async (req, res) => {
    try {
        console.log("Received a request in getContent route handler");


        const articles = await scraperService.scrapeContent('https://deadspin.com/', commonElements);


        res.json(articles);
    } catch (error) {
        console.error("Error in getContent route handler:", error);
        res.status(500).json({ error: error.message });
    }
};

const nflArticles = async (req, res) => {
    try {

        const footballArticles = await scraperService.scrapeContent('https://deadspin.com/football', commonElements);

        res.json(footballArticles);
    } catch (error) {
        console.error("Error in getContent route handler:", error);
        res.status(500).json({ error: error.message });
    }

};

const mlbArticles = async (req, res) => {
    try {

        const baseballArticles = await scraperService.scrapeContent('https://deadspin.com/baseball/mlb', commonElements);

        res.json(baseballArticles);
    } catch (error) {
        console.error("Error in getContent route handler:", error);
        res.status(500).json({ error: error.message });
    }

};


const nbaArticles = async (req, res) => {
    try {

        const bArticles = await scraperService.scrapeContent('https://deadspin.com/basketball', commonElements);

        res.json(bArticles);
    } catch (error) {
        console.error("Error in getContent route handler:", error);
        res.status(500).json({ error: error.message });
    }

};


module.exports = {
    getContent,
    nflArticles,
    mlbArticles,
    nbaArticles,

};
