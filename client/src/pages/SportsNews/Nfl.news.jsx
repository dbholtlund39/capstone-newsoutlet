import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
// import NflCard from './NflCard.jsx'; // Commented out temporary

const fetchFootballArticles = async () => {
    const { data } = await axios.get("http://localhost:3001/api/sportsNews/football");
    return data;
};

const FootballArticles = () => {
    const { data: articles, isLoading, error } = useQuery('footballArticles', fetchFootballArticles);
    const [linkCopiedState, setLinkCopiedState] = useState({});

    const handleCopyToClipboard = (url, index) => {
        navigator.clipboard.writeText(url).then(() => {
            setLinkCopiedState({
                ...linkCopiedState,
                [index]: true,
            });

            setTimeout(() => {
                setLinkCopiedState({
                    ...linkCopiedState,
                    [index]: false,
                });
            }, 3000);
        });
    };

    const filteredArticles = articles
        ? articles
            .filter(article => article.link && article.link.includes('deadspin.com')) // Filter to include only articles from deadspin.com
            .filter((article, index, self) =>
                index === self.findIndex(a => a.title === article.title)) // Filter out duplicates
        : [];

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message || 'An error occurred'}</p>;
    }

    return (
        <div>
            <h2>Latest NFL News</h2>
            {filteredArticles.length > 0 ? (
                <ul>
                    {filteredArticles.map((article, index) => (
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
                            <button
                                className="copyLinkButton"
                                onClick={() => handleCopyToClipboard(article.link, index)}
                                disabled={linkCopiedState[index]}
                            >
                                {linkCopiedState[index] ? "Link Copied!" : "Copy Link"}
                            </button>
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
