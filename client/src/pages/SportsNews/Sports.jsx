import React, { Component } from "react"
import LatestSportsNews from "./LatestSportsNews"
import Basketball from "./Nba.jsx"
import FootballArticles from "./Nfl.news.jsx"
import MlbNews from "./Mlb.jsx"
import OtherSports from "./OtherSports.jsx"

class Sports extends Component {
  render() {
    const contentStyle = {
      marginTop: "100px",
      marginBottom: "0px",
      padding: "6px",
      borderRadius: "8px",
    }

    const navStyle = {
      position: "static",
      top: "100px",
      backgroundColor: "transparent",
      zIndex: "1000",
      padding: "0px",
      marginBottom: "-160px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    }

    const navLinkStyle = {
      textDecoration: "none",
      color: "blue",
      cursor: "pointer",
      padding: "2% 6%",
      margin: "5px 10px",
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
    )
  }
}

export default Sports
