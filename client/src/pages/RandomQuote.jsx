import React, { useState, useEffect } from 'react';

const RandomQuote = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        setQuote(data);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div>
      {quote ? (
        <div>
          <p>{quote.content}</p>
          <p>- {quote.author}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RandomQuote;