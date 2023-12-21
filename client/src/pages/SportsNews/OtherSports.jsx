import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';


const isSportsRelated = (article) => {
    const sportsKeywords = ['soccer', 'football', 'basketball', 'hockey', 'tennis', 'olympics'];
    const titleContainsKeyword = article.title && sportsKeywords.some(keyword => article.title.toLowerCase().includes(keyword));
    const descriptionContainsKeyword = article.description && sportsKeywords.some(keyword => article.description.toLowerCase().includes(keyword));
    return titleContainsKeyword || descriptionContainsKeyword;
};


const fetchSportsArticles = async ({ queryKey }) => {
    const [_, { category }] = queryKey;
    const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
            q: category,
            from: 'latest',
            sortBy: 'relevance',
            apiKey: 'a608e02eb33540d092613b8c9a7d3a17'
        }
    });
    return response.data.articles.filter(isSportsRelated);
};

const OtherSports = () => {

    const { data: articles, isLoading, error } = useQuery(['sportsNews', { category: 'Sports' }], fetchSportsArticles);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Other Sports News</h2>
            <ul>
                {articles && articles.map((article, index) => (
                    <li className="itemCard" key={index}>
                        <h4>{article.title}</h4>
                        {article.urlToImage && (
                            <div className="imageDiv">
                                <img className="image" src={article.urlToImage} alt={article.title} />
                            </div>
                        )}
                        <p className="article">{article.description}</p>
                        <p className="source">Source: {article.source.name}</p>
                        {article.url && (
                            <p className="article-link">
                                <a className="readMore"
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Read More
                                </a>
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OtherSports;
