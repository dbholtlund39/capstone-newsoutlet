import React from 'react';
import LocalNews from './LocalNews';
import RandomQuote from './RandomQuote';

const Home = () => {

  return (
    <div className= "newsFeed">
      <h4 className= "pageTitle">Welcome to the Home Page</h4>
      <div className= "randomQuote">
      <RandomQuote />
      </div>
      <LocalNews />
    </div>
  );
};

export default Home;