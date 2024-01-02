import React, { Component } from "react";
import LatestSportsNews from "./LatestSportsNews";
import Basketball from "./Nba.jsx";
import FootballArticles from "./Nfl.news.jsx";
import MlbNews from "./Mlb.jsx";
import OtherSports from "./OtherSports.jsx";

class Sports extends Component {
  render() {
    const contentStyle = {
      marginTop: "20px",
      padding: "6px",
      borderRadius: "8px",
      textAlign: "center",
    };

    const navStyle = {
      position: 'sticky',
      top: '0',
      backgroundColor: '#FFF',
      zIndex: '1000',
      padding: '10px 0',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const navLinkStyle = {
      textDecoration: "none",
      color: "blue",
      cursor: "pointer",
      padding: "9px 15px",
      margin: "0 5px",
    };


    return (
      <div>
        <nav style={navStyle}>
          <a style={navLinkStyle} href="#home">Home</a>
          <a style={navLinkStyle} href="#basketball">Basketball</a>
          <a style={navLinkStyle} href="#footballArticles">Football</a>
          <a style={navLinkStyle} href="#mlbNews">Baseball</a>
          <a style={navLinkStyle} href="#other">Other Sports</a>
        </nav>

        <div id="home" style={contentStyle}>
          <LatestSportsNews />
        </div>
        <div id="basketball" style={contentStyle}>
          <Basketball />
        </div>
        <div id="footballArticles" style={contentStyle}>
          <FootballArticles />
        </div>
        <div id="mlbNews" style={contentStyle}>
          <MlbNews />
        </div>
        <div id="other" style={contentStyle}>
          <OtherSports />
        </div>
      </div>
    );
  }
}

export default Sports;
