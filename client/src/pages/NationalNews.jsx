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
      const storedData = localStorage.getItem(`nationalNews_${countryCode}`);
      if (storedData) {
        setArticles(JSON.parse(storedData));
        setLoading(false);
      } else {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setArticles(data.articles || []);

        localStorage.setItem(`nationalNews_${countryCode}`, JSON.stringify(data.articles));
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
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
      <h4 className= "pageTitle">National News</h4>
      <label className= "inputLabel">
        Enter Country Code: ("Example: us"){" "}
        <input
          type="text"
          value={userCountryCode}
          onChange={handleCountryCodeChange}
        />
      </label>
      <button onClick={handleFetchNews}>Fetch News</button>

      {loading ? (
        <p className="loading">Loading articles...</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li className= "itemCard" key={article.title}>
              <h4>{article.title}</h4>
              <p className= "description">{article.description}</p>
              <p className= "author">Author: {article.author}</p>
              <p className="published">Published at: {article.publishedAt}</p>
              <p className="source">
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