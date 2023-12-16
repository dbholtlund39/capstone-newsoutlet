import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sport.css";

const NbaStandings = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("Fetching NBA standings data...");
                const response = await axios.get('http://localhost:3001/api/sportsNews/standings');
                console.log("Received response:", response.data);

                const parser = new DOMParser();
                const doc = parser.parseFromString(response.data, "text/html");

                const table = doc.querySelector(".StatsStandingsTable_primary__x5K4w");
                const teamsData = [];

                if (table) {
                    table.querySelectorAll("tbody tr").forEach((row, index) => {
                        console.log(`Row ${index + 1}:`, row.outerHTML);
                        const teamNameElement = row.querySelector("[field='TEAM_ID']");
                        const winsElement = row.querySelector("[field='WINS']");
                        const lossesElement = row.querySelector("[field='LOSSES']");
                        // Extract other data as needed

                        const teamName = teamNameElement ? teamNameElement.textContent.trim() : "";
                        const wins = winsElement ? winsElement.textContent.trim() : "";
                        const losses = lossesElement ? lossesElement.textContent.trim() : "";
                        // Process other data similarly

                        console.log("Team:", teamName);
                        console.log("Wins:", wins);
                        console.log("Losses:", losses);

                        teamsData.push({ teamName, wins, losses /*, other extracted data */ });
                    });
                }

                setData(teamsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching NBA standings:", error);
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
            {!loading && data.length > 0 && (
                <div>
                    <h4 className="pageTitle">NBA Standings</h4>
                    {data.map((team, index) => (
                        <div key={index} className="team-card">
                            <img
                                src={team.imgUrl}
                                alt={`${team.teamName} Logo`}
                                className="team-logo"
                            />
                            <div style={scrollableStyle}>
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

export default NbaStandings;
