import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sport.css";

const NflCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching NFL standings data...");
        const response = await axios.get(
          "https://www.nfl.com/standings/league/2023/REG"
        );
        console.log("Received response from the NFL standings page.");

        // Create a DOMParser
        const parser = new DOMParser();

        // Parse the HTML content
        const doc = parser.parseFromString(response.data, "text/html");

        // Extract team data using DOM methods
        const teamsData = [];

        // Find the table element in the parsed document
        const table = doc.querySelector("table.d3-o-table");

        // Check if the table exists
        if (table) {
          // Loop through the rows of the table
          table.querySelectorAll("tbody tr").forEach((row, index) => {
            console.log(`Row ${index + 1}:`, row.outerHTML);
            const teamNameElement = row.querySelector(".d3-o-club-fullname");
            const winsElement = row.querySelector("td:nth-child(2)");
            const lossesElement = row.querySelector("td:nth-child(3)");
            const imgElement = row.querySelector(".d3-o-club-logo img");
            console.log(`Wins Element ${index + 1}:`, winsElement);
            // Check if elements exist before accessing properties
            const teamName = teamNameElement
              ? teamNameElement.textContent.trim()
              : "";
            const wins = winsElement ? winsElement.textContent.trim() : "";
            const losses = lossesElement
              ? lossesElement.textContent.trim()
              : "";
            const imgUrl = imgElement ? imgElement.src : "";


            teamsData.push({ teamName, wins, losses, imgUrl });
          });
        }

        console.log("Successfully extracted NFL standings data.");
        setData(teamsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching NFL standings:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollableStyle = {
    maxHeight: '400px',
    overflowY: 'auto',

  };

  return (
    <div className="standings-container">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data.length > 0 && (
        <div style={scrollableStyle}>
          <h4 className="pageTitle">NFL Standings</h4>
          {data.map((team, index) => (
            <div key={index} className="team-card">
              <img
                src={team.imgUrl}
                alt={`${team.teamName} Logo`}
                className="team-logo"
              />
              <div className="team-info">
                <h3>{team.teamName}</h3>
                <p>Wins: {team.wins}</p>
                <p>Losses: {team.losses}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NflCard;
