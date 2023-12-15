import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sport.css'

const LatestSportsNews = () => {
    const [latestNews, setLatestNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchSportsNews = async () => {
            try {

                const response = await axios.get('http://localhost:3001/api/sportsNews');
                setLatestNews(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchSportsNews();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="newsFeed">
            <h2>Latest Sports News</h2>
            <div className="news-content">
                <div className="large-article">
                    {/* Render the first (larger) article here */}
                </div>
                <div className="scrollable-container">
                    <div className="scrollable-content">
                        {latestNews.map((article, index) => (
                            <div
                                key={index}
                                className="article small-article"
                            >
                                <h3>{article.title}</h3>
                                {article.imageUrl && (
                                    <img
                                        src={article.imageUrl}
                                        alt={`Image for ${article.title}`}
                                        className="article-image"
                                    />
                                )}
                                <p>{article.summary}</p>
                                <a href={article.link} target="_blank" rel="noopener noreferrer">
                                    Read More
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestSportsNews;