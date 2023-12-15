import React, { useState, useEffect } from "react";
import axios from "axios";

const FootballArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFootballArticles = async () => {
            try {
                console.log("Fetching football articles...");
                const response = await axios.get("http://localhost:3001/api/sportsNews/football");
                console.log("Received football articles response.");

                // Assuming the response contains an array of football articles
                const footballArticles = response.data;

                setArticles(footballArticles);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching football articles:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchFootballArticles();
    }, []);

    return (
        <div>
            <h2>Football Articles</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {articles.length > 0 && (
                <div>
                    {articles.map((article, index) => (
                        <div key={index}>
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
        </div>
    );
};

export default FootballArticles;
