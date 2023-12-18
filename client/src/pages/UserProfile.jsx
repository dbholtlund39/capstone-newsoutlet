import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const initialUserData = {
    username: "",
    favoriteTeams: [],
  };

  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [editing, setEditing] = useState(false);
  const [signUpMode, setSignUpMode] = useState(false);

  const nflTeams = [
    "Arizona Cardinals",
    "Atlanta Falcons",
    "Baltimore Ravens",
    "Buffalo Bills",
    "Carolina Panthers",
    "Chicago Bears",
    "Cincinnati Bengals",
    "Cleveland Browns",
    "Dallas Cowboys",
    "Denver Broncos",
    "Detroit Lions",
    "Green Bay Packers",
    "Houston Texans",
    "Indianapolis Colts",
    "Jacksonville Jaguars",
    "Kansas City Chiefs",
    "Las Vegas Raiders",
    "Los Angeles Chargers",
    "Los Angeles Rams",
    "Miami Dolphins",
    "Minnesota Vikings",
    "New England Patriots",
    "New Orleans Saints",
    "New York Giants",
    "New York Jets",
    "Philadelphia Eagles",
    "Pittsburgh Steelers",
    "San Francisco 49ers",
    "Seattle Seahawks",
    "Tampa Bay Buccaneers",
    "Tennessee Titans",
    "Washington Commanders"
  ];

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setSignedIn(true);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    sessionStorage.setItem("userData", JSON.stringify(userData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleTeamsChange = (e) => {
    const selectedTeams = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setUserData((prevUserData) => ({
      ...prevUserData,
      favoriteTeams: selectedTeams,
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.status === 200) {
        setSignedIn(true);

        const userResponse = await fetch(
          `http://localhost:3001/api/${formData.username}`
        );
        if (userResponse.status === 200) {
          const user = await userResponse.json();
          setUserData(user);
        }
      } else {
        console.error("Sign In failed:", response.statusText);
      }
    } catch (error) {
      console.error("Sign In failed:", error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          name: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
          email: formData.email,
        }),
      });

      if (response.status === 201) {
        await handleSignIn();
      } else {
        const errorData = await response.json();
        console.error("Sign Up failed:", errorData.error);
      }
    } catch (error) {
      console.error("Sign Up failed:", error.message);
    }
  };

  const handleSignOut = () => {
    setSignedIn(false);
    setUserData(initialUserData);
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
    });
    sessionStorage.removeItem("userData");
  };

  return (
    <div className="profileMainDiv">
      {signedIn ? (
        <>
          <h3 className="pageTitle">{userData.username}'s Profile</h3>
          {editing ? (
            <div className="userProfileDisplay">
              <p>
                <strong>Username:</strong> {userData.username}
              </p>
              <label>
                Favorite Teams
                <br />
                <select
                  multiple
                  name="favoriteTeams"
                  value={userData.favoriteTeams}
                  onChange={handleTeamsChange}
                >
                  {nflTeams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </label>
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div className="userProfileDisplay">
              <p className="usernameP">
                <strong>Username: </strong> {userData.username}
              </p>
              <p className="teamList">
                <strong>Favorite Teams:</strong>{" "}
                {userData.favoriteTeams &&
                  userData.favoriteTeams.map((team, index) => (
                    <span key={team}>
                      {team}
                      {index !== userData.favoriteTeams.length - 1 ? ", " : ""}
                    </span>
                  ))}
              </p>
              <button className="editButton" onClick={handleEdit}>
                Edit
              </button>
            </div>
          )}
          <button className="signOutButton" onClick={handleSignOut}>
            Sign Out
          </button>
        </>
      ) : (
        <div className="pageTitle">
          <h3 className= "registrationFont">{signUpMode ? "Register" : "Sign In"}</h3>
          {signUpMode }{" "}
          <div className= "signupFlex">
          <label>
            Username: <input type="text" name="username" onChange={handleFormChange} />
          </label>
          <label>
            Password: <input
              type="password"
              name="password"
              onChange={handleFormChange}
            />
            <p className= "passwordFont">Min password length of 8</p>
          </label>
          {signUpMode && (
            <>
              <label>
                Confirm Password: <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleFormChange}
                />
                
              </label>
              <label>
                Email: <input type="email" name="email" onChange={handleFormChange} />
              </label>
              <label>
                First Name: <input
                  type="text"
                  name="firstName"
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Last Name: <input
                  type="text"
                  name="lastName"
                  onChange={handleFormChange}
                />
              </label>
              
            </>
            
          )}
          
          <button className= "signUpButton" onClick={signUpMode ? handleSignUp : handleSignIn}>
            {signUpMode ? "Sign Up" : "Sign In"}
          </button>
          <p className= "signUpFont">
            {signUpMode
              ? "Already have an account?"
              : "Don't have an account? Sign up now!"}
            <button className="signInButton" onClick={() => setSignUpMode(!signUpMode)}>
              {signUpMode ? "Sign In" : "Sign Up"}
            </button>
          </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
