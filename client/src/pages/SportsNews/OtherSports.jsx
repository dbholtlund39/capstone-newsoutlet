import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OtherSports = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async (category) => {
            try {
                const response = await axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: category,
                        from: 'latest',
                        sortBy: 'relevance',
                        apiKey: 'a608e02eb33540d092613b8c9a7d3a17'
                    }
                });
                return response.data.articles;
            } catch (err) {
                console.error('Error fetching articles:', err);
                setError(err);
            }
        };

        const fetchAllCategories = async () => {
            try {
                const categories = ['Sports']; // Add more categories as needed
                const promises = categories.map(category => fetchArticles(category));
                const results = await Promise.all(promises);
                const filteredArticles = results.flat().filter(article => isSportsRelated(article));
                setArticles(filteredArticles); // Use the filtered articles
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCategories();
    }, []);

    const isSportsRelated = (article) => {
        const sportsKeywords = ['soccer', 'football', 'basketball', 'hockey', 'tennis', 'olympics']; // Add more keywords as needed

        // Check if the title or description contains sports-related keywords
        // Ensure title and description are not null before calling toLowerCase
        const titleContainsKeyword = article.title && sportsKeywords.some(keyword => article.title.toLowerCase().includes(keyword));
        const descriptionContainsKeyword = article.description && sportsKeywords.some(keyword => article.description.toLowerCase().includes(keyword));

        return titleContainsKeyword || descriptionContainsKeyword;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Other Sports News</h2>
            <ul>
                {articles.map((article, index) => (
                    <li className="itemCard" key={index}>
                        <h4>{article.title}</h4>
                        {article.urlToImage && (
                            <div className="imageDiv">
                                <img className="image" src={article.urlToImage} alt={article.title} />
                            </div>
                        )}
                        <p className="article">{article.description}</p>

                        <p className="source">Source: {article.source.name}</p>
                        {article.url && (
                            <p className="article-link">
                                <a className="readMore"
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Read More
                                </a>
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OtherSports;
