import React, { useState, useEffect } from "react";

const LocalNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const userCountryCode = "ca";

  const fetchLocalNews = async (countryCode) => {
    const apiKey = "8cc2063285f3470b96ff200384478e9b";

    try {
      const storedData = localStorage.getItem(`localNews_${countryCode}`);
      if (storedData) {
        setArticles(JSON.parse(storedData));
        setLoading(false);
      } else {
        const apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=${countryCode}&pageSize=5`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setArticles(data.articles || []);

        localStorage.setItem(`localNews_${countryCode}`, JSON.stringify(data.articles));
      }
    } catch (error) {
      console.error("Error fetching local news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocalNews(userCountryCode);
  }, [userCountryCode]);

  return (
    <div>
      <h3>Local News:</h3>

      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <h4>{article.title}</h4>
              <p>{article.description}</p>
              <p>Author: {article.author}</p>
              <p>Published at: {article.publishedAt}</p>
              <p>Source: {article.source.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocalNews;