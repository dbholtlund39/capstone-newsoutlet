import React, { useState, useEffect } from "react";

const Stocks = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStockData = async (symbol) => {
    const apiKey = "WOTV3BJTI5YD05M7";
    const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data["Global Quote"] || {};
    } catch (error) {
      console.error(`Error fetching stock data for ${symbol}:`, error);
      setError(error.message);
      return {};
    }
  };

  const fetchStocks = async () => {
    const symbols = [
      "AAPL",
      "GOOGL",
      "MSFT",
      "AMZN",
      "TSLA",
      "NFLX",
      "PINS",
      "SHOP",
      "NKE",
      "TDOC",
      "GME",
      "AMC",
      "FB",
      "GOOG",
      "BA",
      "CSCO",
      "IBM",
      "INTC",
      "JNJ",
      "GS",
      "CVX",
      "JPM",
      "KO",
      "PEP",
      "DIS",
      "MCD",
      "V",
      "WMT",
      "PG",
      "CAT",
      "ADBE",
      "NVDA",
      "PYPL",
      "HD",
      "ORCL",
      "ABBV",
      "CMCSA",
      "TMO",
      "UNH",
      "VZ",
      "WFC",
      "TMUS",
      "BAC",
      "XOM",
      "COST",
      "MRK",
      "C",
      "PFE",
      "CVS",
      "ABT",
    ];
    const cachedStocks = {};

    try {
      symbols.forEach((symbol) => {
        const cachedData = sessionStorage.getItem(symbol);
        if (cachedData) {
          cachedStocks[symbol] = JSON.parse(cachedData);
        }
      });

      const promises = symbols
        .filter((symbol) => !cachedStocks[symbol])
        .map(async (symbol) => {
          const data = await fetchStockData(symbol);
          sessionStorage.setItem(symbol, JSON.stringify(data));
          return data;
        });

      const stockResults = await Promise.all(promises);
      setStockData([...stockResults, ...Object.values(cachedStocks)]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <div className="stocksFeed">
      <div className="stockResults">
        {loading ? (
          <p className="loading">Loading stock data...</p>
        ) : (
          <div>
            {error && <p className="error">{error}</p>}
            {stockData
              .filter((stock) => Object.keys(stock).length > 0)
              .map((stock, index) => (
                <div key={index}>
                  <h4>{stock["01. symbol"]}</h4>
                  <p className="stockPrice">Price: {stock["05. price"]}</p>
                  <p className="stockChange">Change: {stock["09. change"]}</p>
                  <p className="stockChangePercent">
                    Change Percent: {stock["10. change percent"]}
                  </p>
                  <p className="stockTimestamp">
                    Last Updated: {stock["07. latest trading day"]}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stocks;