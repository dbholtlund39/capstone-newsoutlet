import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser'; // Import the html-react-parser library

const LatestSportsNews = () => {
    const [latestNews, setLatestNews] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Define the function inside the effect to fetch the news
        const fetchSportsNews = async () => {
            try {
                // Assuming your API_URL is the base URL for your API
                const response = await axios.get('http://localhost:3001/api/sportsNews');
                setLatestNews(response.data); // Update state with the latest news data
                setIsLoading(false); // Set loading to false after the data is received
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchSportsNews();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="news-container">
            <h2>Latest Sports News</h2>
            {/* Parse and render the HTML content */}
            <div className="news-content">{parse(latestNews)}</div>
        </div>
    );
};

export default LatestSportsNews;
