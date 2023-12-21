import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchMlbArticles = async () => {
    const response = await axios.get('http://localhost:3001/api/sportsNews/baseball');
    return response.data; // This will be the 'data' from useQuery
};

const MlbNews = () => {

    const { data: articles, isLoading, error } = useQuery('mlbNews', fetchMlbArticles);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Latest Major League Baseball News</h2>
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

export default MlbNews;