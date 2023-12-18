import React, { useState, useEffect } from 'react';
import axios from 'axios';


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
            <h2 className= "latestSportsHeader">Latest Sports News</h2>
            <ul className="news-content">
                {latestNews.map((article, index) => (
                    <li className="itemCard" key={index}>
                        <h4>{article.title}</h4>
                        {article.imageUrl && (
                            <div className="imageDiv">
                                <img className="image" src={article.imageUrl} alt={article.title} />
                            </div>
                        )}
                        <p className="article">{article.description}</p>
                        <a className="readMore" href={article.link} target="_blank" rel="noopener noreferrer">
                            Read More
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LatestSportsNews;
