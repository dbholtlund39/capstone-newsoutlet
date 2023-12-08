// Sports.jsx
import React, { Component } from "react";
import Slider from "react-slick";
import NflCard from "./NflCard.jsx";
import NbaCard from "./NbaCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Sports extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const sliderStyle = {
      margin: "20px", // Add margin
      padding: "10px", // Add padding
      border: "1px solid #ddd", // Add border
      borderRadius: "8px", // Add border radius
      position: "relative", // Make the position relative
    };

    const arrowContainerStyle = {
      position: "fixed", // Fixed position
      top: "20px", // Adjust top position
      left: "50%", // Center horizontally
      transform: "translateX(-50%)", // Center horizontally
      zIndex: 1, // Ensure it's above the slider
    };

    const cardStyle = {
      textAlign: "center", // Center text
      backgroundColor: "#f9f9f9", // Set background color
      padding: "20px", // Add padding
      borderRadius: "8px", // Add border radius
    };

    const arrowStyle = {
      fontSize: "32px", // Increase font size for bigger arrows
      cursor: "pointer",
    };

    return (
      <div>
        <div style={arrowContainerStyle}>
          <div
            style={{ ...arrowStyle, marginRight: "20px" }}
            onClick={() => this.slider.slickPrev()}
          >
            &#10094; {/* Left arrow */}
          </div>
          <div
            style={{ ...arrowStyle }}
            onClick={() => this.slider.slickNext()}
          >
            &#10095; {/* Right arrow */}
          </div>
        </div>
        <div style={sliderStyle}>
          <Slider ref={(slider) => (this.slider = slider)} {...settings}>
            <div style={cardStyle}>
              <NflCard />
            </div>
            <div style={cardStyle}>
              <NbaCard />
            </div>
            {/* Add more sports components as needed */}
          </Slider>
        </div>
      </div>
    );
  }
}

export default Sports;


// As a sports enthusiast, I want to access a comprehensive sports news section, covering various sports disciplines and ongoing tournaments.
// As a user, I want to access upcoming games and scores for my favorite teams.
// Acceptance criteria:
// The app should provide a separate segment for sports news encompassing a broad range of sports categories.
// Users should have the ability to browse news articles related to their preferred sports or leagues.
