import React, { useState } from 'react';

const UserProfile = () => {
  const initialUserData = {
    username: 'username',
    location: {
      city: 'city',
      state: "state",
      country: 'country',
    },
    favoriteTeams: [], 
  };

  const [userData, setUserData] = useState(initialUserData);
  const [editing, setEditing] = useState(false); 

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
     setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleTeamsChange = (e) => {
    const selectedTeams = Array.from(e.target.selectedOptions, (option) => option.value);
    setUserData({
      ...userData,
      favoriteTeams: selectedTeams,
    });
  };

  return (
    <div className="profileMainDiv">
      <h3 className= "pageTitle">{initialUserData.username}'s Profile</h3>
      {editing ? (
        <div className="userProfileDisplay">
          <p>
          <strong>Username:</strong> {initialUserData.username}
        </p>
          <label>
            City
            <br></br>
            <input
              type="text"
              name="city"
              value={userData.location.city}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  location: {
                    ...userData.location,
                    city: e.target.value,
                  },
                })
              }
            />
          </label>
          <label>
            State
            <br></br> 
            <input
              type="text"
              name="state"
              value={userData.location.state}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  location: {
                    ...userData.location,
                    state: e.target.value,
                  },
                })
              }
            />
          </label>
          <label>
            Country
            <br></br>
            <input
              type="text"
              name="country"
              value={userData.location.country}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  location: {
                    ...userData.location,
                    country: e.target.value,
                  },
                })
              }
            />
          </label>
          <label>
            Favorite Teams
            <br></br>
            <select
              multiple
              name="favoriteTeams"
              value={userData.favoriteTeams}
              onChange={handleTeamsChange}
            >
              <option value="Carolina Panthers">Carolina Panthers</option>
              <option value="Arizona Cardinals">Arizona Cardinals</option>
              <option value="New England Patriots">New England Patriots</option>
              <option value="Washington Commanders">Washington Commanders</option>
              <option value="Chigago Bears">Chicago Bears</option>
              <option value="Las Vegas Raiders">Las Vegas Raiders</option>
              <option value="Los Angeles Chargeres">Los Angeles Chargers</option>
              <option value="New York Giants">New York Giants</option>
              <option value="New York Jets">New York Jets</option>
              <option value="Tennessee Titans">Tennessee Titans</option>
              <option value="Atlanta Falcons">Atlanta Falcons</option>
              <option value="Green Bay Packers">Green Bay Packers</option>
              <option value="Los Angeles Rams">Los Angeles Rams</option>
              <option value="New Orleans Saints">New Orleans Saints</option>
              <option value="Seattle Seahawks">Seattle Seahawks</option>
              <option value="Tampa Bay Buccaneers">Tampa Bay Buccaneers</option>
              <option value="Buffalo Bills">Buffalo Bills</option>
              <option value="Cincinnati Bengals">Cincinnati Bengals</option>
              <option value="Denver Broncos">Denver Broncos</option>
              <option value="Houston Texans">Houston Texans</option>
              <option value="Indianapolis Colts">Indianapolis Colts</option>
              <option value="Minnesota Vikings">Minnesota Vikings</option>
              <option value="Pittsburgh Steelers">Pittsburgh Steelers</option>
              <option value="Cleveland Browns">Cleveland Browns</option>
              <option value="Jacksonville Jaguars">Jacksonville Jaguars</option>
              <option value="Kansas City Chiefs">Kansas City Cheifs</option>
              <option value="Detroit Lions">Detroit Lions</option>
              <option value="Miami Dolphins">Miami Dolphins</option>
              <option value="Baltimore Ravens">Baltimore Ravens</option>
              <option value="Dallas Cowboys">Dallas Cowboys</option>
              <option value="Philadelphia Eagles">Philadelphia Eagles</option>
              <option value="San Francisco 49ers">San Francisco 49ers</option>
            </select>
          </label>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="userProfileDisplay">
          <p className= "usernameP"> 
          <strong>Username:</strong> {initialUserData.username}
          </p>
          <p className= "locationP">
            <strong>Location:</strong> {userData.location.city}, {userData.location.state}, {userData.location.country}
          </p>
          <p className= "teamList">
          <strong>Favorite Teams:</strong>{' '}
  {userData.favoriteTeams.map((team, index) => (
    <span key={team}>
      {team}
      {index !== userData.favoriteTeams.length - 1 ? ', ' : ''}
    </span>
  ))}
          </p>
          <button className= "editButton" onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;