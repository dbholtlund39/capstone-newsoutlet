import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Basketball = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNbaArticles = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/sportsNews/basketball");
                setArticles(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNbaArticles();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Could not load: {error.message}</p>;
    }

    return (
        <div>
            <h2>Basketball News</h2>
            {articles.length > 0 ? (
                <ul>
                    {articles.map((article, index) => (
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
            ) : (
                <p>No articles found.</p>
            )}
        </div>
    );
};

export default Basketball;
