import axios from 'axios';
import cheerio from 'cheerio';

const scrapeContent = async (url, selectors) => {
    try {
        console.log(`Scraping content from: ${url}`);
        const { data } = await axios.get(url);
        console.log(`Data fetched from ${url}`);
        const $ = cheerio.load(data);

        const articles = [];

        $(selectors.articleSelector).each((index, element) => {
            const article = {
                title: $(element).find(selectors.titleSelector).text(),
                description: $(element).find(selectors.descriptionSelector).text(),
                link: $(element).find(selectors.linkSelector).attr('href'),
                imageUrl: $(element).find(selectors.imageSelector).attr('src'),
            };

            articles.push(article);
        });

        console.log(`Scraped ${articles.length} articles from ${url}`);
        return articles;
    } catch (error) {
        console.error(`Error scraping content from ${url}: ${error.message}`);
        throw new Error(`Error scraping content: ${error.message}`);
    }
};

module.exports = {
    scrapeContent,
};