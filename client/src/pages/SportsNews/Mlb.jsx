import React, { useState, useEffect } from "react";
import axios from "axios";

const MlbNews = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/sportsNews/baseball');
                setArticles(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Latest Major League Baseball News</h2>
            {articles.length > 0 ? (
                <ul>
                    {articles.map((article, index) => (
                        <li key={index}>
                            <h3>{article.title}</h3>
                            {article.imageUrl && <img src={article.imageUrl} alt={article.title} />}
                            <p>{article.description}</p>
                            <a href={article.link} target="_blank" rel="noopener noreferrer">
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

export default MlbNews;
