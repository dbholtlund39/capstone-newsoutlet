import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';


const fetchNbaArticles = async () => {
    const { data } = await axios.get("http://localhost:3001/api/sportsNews/basketball");
    return data;
};

const Basketball = () => {

    const { data: articles, isLoading, error } = useQuery('nbaArticles', fetchNbaArticles);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Could not load: {error.message}</p>;
    }

    return (
        <div>
            <h2>Basketball News</h2>
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
        </div>
    );
};

export default Basketball;
