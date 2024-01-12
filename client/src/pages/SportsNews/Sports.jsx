import React, { Component } from "react";
import LatestSportsNews from "./LatestSportsNews";
import Basketball from "./Nba.jsx";
import FootballArticles from "./Nfl.news.jsx";
import MlbNews from "./Mlb.jsx";
import OtherSports from "./OtherSports.jsx";

class Sports extends Component {
  render() {
    const contentStyle = {
      marginTop: "100px",
      marginBottom: "0px",
      padding: "6px",
      borderRadius: "8px",
    };

    const navStyle = {
      position: "sticky",
      top: "0",
      backgroundImage: "url('imageDivBackground.jpg')",
      zIndex: "1000",
      padding: "10px 0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    const navLinkStyle = {
      textDecoration: "none",
      color: "light grey",
      cursor: "pointer",
      padding: "10px 20px",
      margin: "0 10px",
      backgroundSize: "cover",
    };

    // Media query for smaller screens
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    // Adjust styles for smaller screens
    if (mediaQuery.matches) {
      navStyle.flexDirection = "column";
      navLinkStyle.margin = "5px 0";
    }

    return (
      <div>
        <nav style={navStyle}>
          <a style={navLinkStyle} href="#home">
            Home
          </a>
          <a style={navLinkStyle} href="#basketball">
            Basketball
          </a>
          <a style={navLinkStyle} href="#footballArticles">
            Football
          </a>
          <a style={navLinkStyle} href="#mlbNews">
            Baseball
          </a>
          <a style={navLinkStyle} href="#other">
            Other Sports
          </a>
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
