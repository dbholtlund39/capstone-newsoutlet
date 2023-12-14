import React from 'react';
import LocalNews from './LocalNews';
import RandomQuote from './RandomQuote';

const Home = () => {

  return (
    <div>
      <h4 className= "pageTitle">Welcome to the Home Page</h4>
      <RandomQuote />
      <LocalNews />
    </div>
  );
};

export default Home;