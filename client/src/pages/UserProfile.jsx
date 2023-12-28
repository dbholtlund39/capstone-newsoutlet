import React, { useState, useEffect } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

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
    email: "",
    name: {
      firstName: "",
      lastName: "",
    },
    location: "",
  });
  const [favoriteTeams, setFavoriteTeams] = useState([])
  const [editing, setEditing] = useState(false);
  const [signUpMode, setSignUpMode] = useState(false);

  useEffect(() => {
    console.log(favoriteTeams);

  }, [favoriteTeams.length]
  )

  const nflTeams = [
    { label: "Arizona Cardinals", value: "Arizona Cardinals" },
    { label: "Atlanta Falcons", value: "Atlanta Falcons" },
    { label: "Baltimore Ravens", value: "Baltimore Ravens" },
    { label: "Buffalo Bills", value: "Buffalo Bills" },
    { label: "Carolina Panthers", value: "Carolina Panthers" },
    { label: "Chicago Bears", value: "Chicago Bears" },
    { label: "Cincinnati Bengals", value: "Cincinnati Bengals" },
    { label: "Cleveland Browns", value: "Cleveland Browns" },
    { label: "Dallas Cowboys", value: "Dallas Cowboys" },
    { label: "Denver Broncos", value: "Denver Broncos" },
    { label: "Detroit Lions", value: "Detroit Lions" },
    { label: "Green Bay Packers", value: "Green Bay Packers" },
    { label: "Houston Texans", value: "Houston Texans" },
    { label: "Indianapolis Colts", value: "Indianapolis Colts" },
    { label: "Jacksonville Jaguars", value: "Jacksonville Jaguars" },
    { label: "Kansas City Chiefs", value: "Kansas City Chiefs" },
    { label: "Las Vegas Raiders", value: "Las Vegas Raiders" },
    { label: "Los Angeles Chargers", value: "Los Angeles Chargers" },
    { label: "Los Angeles Rams", value: "Los Angeles Rams" },
    { label: "Miami Dolphins", value: "Miami Dolphins" },
    { label: "Minnesota Vikings", value: "Minnesota Vikings" },
    { label: "New England Patriots", value: "New England Patriots" },
    { label: "New Orleans Saints", value: "New Orleans Saints" },
    { label: "New York Giants", value: "New York Giants" },
    { label: "New York Jets", value: "New York Jets" },
    { label: "Philadelphia Eagles", value: "Philadelphia Eagles" },
    { label: "Pittsburgh Steelers", value: "Pittsburgh Steelers" },
    { label: "San Francisco 49ers", value: "San Francisco 49ers"},
    { label: "Seattle Seahawks", value: "Seattle Seahawks" },
    { label: "Tampa Bay Buccaneers", value: "Tampa Bay Buccaneers" },
    { label: "Tennessee Titans", value: "Tennessee Titans" },
    { label: "Washington Commanders", value: "Washington Commanders" }
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

  const handleSave = async () => {
    setEditing(false);
    // sessionStorage.setItem("userData", JSON.stringify(userData));
    try {
      const response = await fetch(`http://localhost:3001/api/${formData.username}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          // I need to set this up to only take in the changes and not all the data again
          ...userData
        })
      })
    } catch (error) {
      console.error("Edits failed to save", error.message)
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevUserData) => ({
  //     ...prevUserData,
  //     [name]: [...value],
  //   }));
  // };

  const handleTeamsChange = (teams) => {
    setFavoriteTeams(teams.map(team => ({
      id: uuidv4(), 
      ...team
    }))
  )}

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
          email: formData.email,
          name: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
          location: formData.location,
          favoriteTeams
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

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/${formData.username}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          body: JSON.stringify({
            location: formData.location,
            favoriteTeams
          })
        }
      })
    } catch (error) {
      console.error("Update Failed:", error.message, error.status);
    }
  }

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
                Favorite Teams:
                <br />
                <select
                  multiple
                  name="favoriteTeams"
                  value={userData.favoriteTeams}
                  onChange={handleTeamsChange}
                >
                  {nflTeams.map((team) => (
                    <option key={team.id} value={team}>
                      {team.label}
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
                    <span key={team.id}>
                      {team.label}
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
            <p className= "passwordFont">Min. password length 8 characters</p>
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
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Last Name: <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Location: <input 
                  type="text"
                  placeholder="Country Code"
                  name="location"
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Favorite Teams:
                <Select
                defaultValue={[""]}
                placeholder="Favorite Teams"
                name="favoriteTeams"
                isMulti
                options={nflTeams}
                onChange= {handleTeamsChange}
                // {(
                //   (selected) => {
                //     console.log(selected)
                //     setFormData({
                //     favoriteTeams: [...favoriteTeams, selected]
                //   })
                //   }
                // )}
                className="basic-multi-select"
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
              : "Not registered? Sign up now!"}
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