import React, { useState, useEffect } from "react";
const NationalNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCountryCode, setUserCountryCode] = useState("");
  const [linkCopiedState, setLinkCopiedState] = useState({});

  const fetchArticles = async (countryCode) => {
    const apiKey = "UiHVtYvNUQ2wFOsMqMwPb2KGWTAu9lg0oeBFhBsC";
    try {
      const storedData = localStorage.getItem(`nationalNews_${countryCode}`);
      if (storedData !== null) {
        setArticles(JSON.parse(storedData));
      } else {
        const apiUrl = `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=${countryCode}&limit=10`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorText = `HTTP error! Status: ${response.status}, ${response.statusText}`;
          throw new Error(errorText);
        }

        const data = await response.json();

        if (Array.isArray(data.data)) {
          setArticles(data.data);
          localStorage.setItem(
            `nationalNews_${countryCode}`,
            JSON.stringify(data.data)
          );
        } else {
          console.error(
            "API response does not contain a valid 'data' field:",
            data
          );
        }
      }
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

  const defaultImageUrl = "src/components/images/defaultNewsImage.jpg";

  const filteredArticles = articles.filter(
    (article) => article.title !== "[Removed]"
  );

  return (
    <div className="newsFeed">
      <h4 className="pageTitle"></h4>
      <div className="countryCode">
        <label className="inputLabel">
          Enter Country Code: ("Example: us"){" "}
          <input
            type="text"
            value={userCountryCode}
            onChange={handleCountryCodeChange}
          />
        </label>
        <button onClick={handleFetchNews}>Fetch News</button>
      </div>
      {loading ? (
        <p className="loading">Loading articles...</p>
      ) : (
        <ul>
          {filteredArticles.map((article, index) => (
            <li className="itemCard" key={index}>
              <h4>{article.title}</h4>
              {article.image_url && (
                <div className="imageDiv">
                  <img
                    className="image"
                    src={article.image_url}
                    alt="Article"
                  />
                </div>
              )}
              {!article.image_url && (
                <div className="imageDiv">
                  <img className="image" src={defaultImageUrl} alt="Default" />
                </div>
              )}
              <p className="article">{article.description}</p>
              <p className="published">Published at: {article.published_at}</p>
              <p className="source">Source: {article.source}</p>
              {article.url && (
                <div>
                  <p className="article-link">
                    <a
                      className="readMore"
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                  </p>
                  <button
                    className="copyLinkButton"
                    onClick={() => handleCopyToClipboard(article.url, index)}
                    disabled={linkCopiedState[index]}
                  >
                    {linkCopiedState[index] ? "Link Copied!" : "Copy Link"}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NationalNews;
