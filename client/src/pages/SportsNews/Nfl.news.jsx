import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
// import NflCard from './NflCard.jsx'; // Commented out temporary

const fetchFootballArticles = async () => {
    const { data } = await axios.get("http://localhost:3001/api/sportsNews/football");
    return data;
};

const FootballArticles = () => {
    const { data: articles, isLoading, error } = useQuery('footballArticles', fetchFootballArticles);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message || 'An error occurred'}</p>;
    }

    return (
        <div>
            <h2>Latest NFL News</h2>
            {articles && articles.length > 0 ? (
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
            {/* Commented out for now
            <div id="nflCard">
                <NflCard />
            </div>
            */}
        </div>
    );
};

export default FootballArticles;
