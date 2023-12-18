import React, { useState, useEffect } from "react";
import axios from "axios";
import NflCard from "./NflCard.jsx";

const FootballArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFootballArticles = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/sportsNews/football");
                setArticles(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchFootballArticles();
    }, []);

    const contentStyle = {
        // styles here
    };

    return (
        <div>
            <h2>Latest NFL News</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message || 'An error occurred'}</p>}
            {articles.length > 0 && (
                <div>
                    {articles.map((article) => (
                        <div key={article.id}>
                            <h3>{article.title}</h3>
                            {article.imageUrl && (
                                <img src={article.imageUrl} alt={`Image for ${article.title}`} />
                            )}
                            <p>{article.description}</p>
                            <a href={article.link} target="_blank" rel="noopener noreferrer">
                                Read More
                            </a>
                        </div>
                    ))}
                </div>
            )}
            <div id="nflCard" style={contentStyle}>
                <NflCard />
            </div>
        </div>
    );
};

export default FootballArticles;
