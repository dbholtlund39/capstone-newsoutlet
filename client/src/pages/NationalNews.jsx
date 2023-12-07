import React, { useState, useEffect } from "react";

const NationalNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCountryCode, setUserCountryCode] = useState(""); 

  const fetchArticles = async (countryCode) => {
    const apiKey = "8cc2063285f3470b96ff200384478e9b";

    const apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=${countryCode}&pageSize=5`;

    setLoading(true);

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryCodeChange = (event) => {
    setUserCountryCode(event.target.value);
  };

  const handleFetchNews = () => {
    if (userCountryCode.trim() !== "") {
      fetchArticles(userCountryCode);
    } else {
      console.error("Invalid country code");
    }
  };

  return (
    <div>
      <h3>Local News:</h3>
      <label>
        Enter Country Code:{" "}
        <input
          type="text"
          value={userCountryCode}
          onChange={handleCountryCodeChange}
        />
      </label>
      <button onClick={handleFetchNews}>Fetch News</button>

      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.title}>
              <h4>{article.title}</h4>
              <p>{article.description}</p>
              <p>Author: {article.author}</p>
              <p>Published at: {article.publishedAt}</p>
              <p>
                Source: {article.source.name}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NationalNews;