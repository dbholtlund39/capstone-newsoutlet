const axios = require('axios');
const cheerio = require('cheerio');

const urlSelectors = {
    'https://deadspin.com/': 'body > div:nth-child(3) > div.sc-157agsr-0.jvChWP > div > div > main > div',
    // Add other URLs and their selectors here
};

const scrapeContent = async (url) => {
    try {
        console.log(`Scraping content from: ${url}`); // Log the URL being scraped

        if (!urlSelectors[url]) {
            throw new Error(`No selector defined for URL: ${url}`);
        }

        console.log(`Using selector: ${urlSelectors[url]}`); // Log the selector being used

        const { data } = await axios.get(url);
        console.log(`Data fetched from ${url}`); // Log after successful data fetch

        const $ = cheerio.load(data);
        const selectedContent = $(urlSelectors[url]).html();

        console.log(`Content successfully scraped from ${url}`); // Log successful scraping

        return selectedContent;
    } catch (error) {
        console.error(`Error scraping content from ${url}: ${error.message}`); // Log errors
        throw new Error(`Error scraping content: ${error.message}`);
    }
};

module.exports = {
    scrapeContent,
};
