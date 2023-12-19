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

    const navLinkStyle = {
      textDecoration: "none",
      color: "blue",
      cursor: "pointer",
      padding: "9px",
      paddingBottom: "4px",
      display: "block",
    };

    return (
      
      <div >
        
        <div style={contentStyle}>
          <nav className= "sportsNav">
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
        
        <nav >
        

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
        <nav className= "sportsNav">

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
