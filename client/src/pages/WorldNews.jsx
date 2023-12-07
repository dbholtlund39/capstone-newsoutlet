import React, { useState, useEffect } from "react";

const WorldNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    const apiKey = "8cc2063285f3470b96ff200384478e9b";
    const regions = {
      Africa: ["za", "ng", "ke"],
      Americas: ["us", "ca", "br", "mx"],
      Asia: ["in", "cn", "jp", "kr"],
      Australia: ["au", "nz"],
      Canada: ["ca"],
      Europe: ["gb", "de", "fr", "es", "it"],
      "Middle East": ["ae", "sa", "eg", "jo"],
      "United Kingdom": ["gb"],
    };

    const articlesArray = [];

    setLoading(true);

    try {
      for (const region in regions) {
        const countryCodes = regions[region];

        for (const country of countryCodes) {
          const apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=${country}&pageSize=5`;

          const response = await fetch(apiUrl);

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          articlesArray.push(...(data.articles || []));
        }
      }

      setArticles(articlesArray);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div>
      <h3>World News:</h3>

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

export default WorldNews;
