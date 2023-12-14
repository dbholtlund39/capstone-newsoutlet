const scraperService = require('../services/scraper.service');

const getContent = async (req, res) => {
    try {
        const content = await scraperService.scrapeContent('https://deadspin.com/');
        res.send(content);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getContent,
};
