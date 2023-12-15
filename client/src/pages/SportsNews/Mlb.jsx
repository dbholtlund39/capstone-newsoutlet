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
            } catch (error) {
                setError(error);
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
            <div className="articles">
                {articles.map((article, index) => (
                    <div key={index} className="article">
                        <h3>{article.title}</h3>
                        {article.imageUrl && (
                            <img
                                src={article.imageUrl}
                                alt={`Image for ${article.title}`}
                                className="article-image"
                            />
                        )}
                        <p>{article.description}</p>
                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                            Read More
                        </a>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default MlbNews;
