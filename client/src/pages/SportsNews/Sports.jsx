import React, { Component } from "react";
import LatestSportsNews from "./LatestSportsNews";
import Basketball from "./Nba.jsx";
import FootballArticles from "./Nfl.news.jsx";
import MlbNews from "./Mlb.jsx";
import OtherSports from "./OtherSports.jsx";
class Sports extends Component {
  render() {
    const contentStyle = {
      margin: "20px",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      textAlign: "center",

    };

    const navLinkStyle = {
      textDecoration: "none",
      color: "glow",
      cursor: "pointer",
      padding: "5px",
      display: "block",
    };

    return (
      <div style={{ margin: "20px" }}>
        <div style={contentStyle}>
          <nav>
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
          <div id="home">
            <LatestSportsNews />
          </div>
        </div>
        <nav>

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
        <nav>

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

        <div></div>
      </div >

    );
  }
}

export default Sports;
