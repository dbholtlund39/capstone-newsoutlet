import axios from 'axios';
import cheerio from 'cheerio';

const scrapeContent = async (url) => {
    try {
        console.log(`Scraping content from: ${url}`); // Log the URL being scraped

        const { data } = await axios.get(url);
        console.log(`Data fetched from ${url}`);
        const $ = cheerio.load(data);


        const articles = [];


        const articleSelector = '.js_post_item';


        $(articleSelector).each((index, element) => {
            // Parse the data for each article
            const article = {
                title: $(element).find('h4').text(),
                description: $(element).find('.sc-1d3a351-0').text(),
                link: $(element).find('.js_link').attr('href'),
                imageUrl: $(element).find('img').attr('src'),
            };

            // Add the parsed article data to the array
            articles.push(article);
        });

        console.log(`Scraped ${articles.length} articles from ${url}`); // Log successful scraping

        return articles;
    } catch (error) {
        console.error(`Error scraping content from ${url}: ${error.message}`); // Log errors
        throw new Error(`Error scraping content: ${error.message}`);
    }
};

module.exports = {
    scrapeContent,
};
