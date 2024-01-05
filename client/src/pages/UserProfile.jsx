import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";


const UserProfile = () => {
  const initialUserData = {                 
    username: "",
    location: "",
    favoriteTeams: [],
  };

  const initialFormData = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    name: {
      firstName: "",
      lastName: "",
    },
    location: "",
    city: "",
    state: "",
  };

  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [formData, setFormData] = useState(initialFormData);
  const [favoriteTeams, setFavoriteTeams] = useState([])
  const [editing, setEditing] = useState(false);
  const [signUpMode, setSignUpMode] = useState(false);
  const navigate = useNavigate();

  const urlBase= import.meta.env.VITE_NODE_ENV === "production" 
  ? import.meta.env.VITE_API_URL 
  : "http://localhost:3001/api";

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setFormData({
      ...formData,
      city,
    });
  };
  
  const handleStateChange = (e) => {
    const state = e.target.value;
    setFormData({
      ...formData,
      state,
    });
  };
  

  const handleTeamsChange = (teams) => {
    setFavoriteTeams(teams.map(team => ({
      id: uuidv4(), 
      ...team
    }))
  )}

  const handleBackButton = () => {
    setEditing(false);
  }


  const handleSignIn = async () => {
    try {
      const response = await fetch(`${urlBase}/signin`, {
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
          `${urlBase}/${formData.username}`
        );
        if (userResponse.status === 200) {
          const user = await userResponse.json();
          setUserData(user);
          setEditing(false);
        }
      } else {
        console.error("Sign In failed:", response.statusText);
      }
    } catch (error) {
      console.error("Sign In failed:", error.message, error.status);
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


  const handleSignUp = async () => {
    try {
      const response = await fetch(`${urlBase}/signup`, {
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
          city: formData.city, 
          state: formData.state,
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
      console.error("Sign Up failed:", error.message, error.status);
    }
  };


  const handleUpdate = async () => {
    try {
      const res = await fetch(`${urlBase}/${formData.username}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: formData.location,
          favoriteTeams
        })
      })

      if(res.status === 200) {
        const updatedUser = await res.json()
        setUserData(updatedUser)
        setEditing(false);
      }
    } catch (error) {
      console.error("Update Failed:", error.message, error.status);
    }
  }


  const handleDelete = async () => {
    try {
      const res = await fetch(`${urlBase}/${formData.username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })

      window.location.reload(false);
    } catch (error) {
     console.error("Delete Failed:", error.message, error.status)
    }
  }

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
                           {/* <label>
          City:{" "}
          <input
            type="text"
            placeholder="Enter City"
            name="city"
            value={formData.city}
            onChange={handleCityChange}
          />
        </label>
        <label>
          State:{" "}
          <input
            type="text"
            placeholder="ex. FL"
            name="state"
            value={formData.state}
            onChange={handleStateChange}
          />
        </label> */}
        <label>
                Country: <input 
                  type="text"
                  placeholder="ex. US"
                  name="location"
                  onChange={handleFormChange}
                />
              </label>
              <label className="faveTeams">
                Favorite Teams:
                <Select
                defaultValue={[""]}
                placeholder="Favorite Teams"
                name="favoriteTeams"
                isMulti
                options={nflTeams}
                onChange= {handleTeamsChange}
                className="basic-multi-select"
                />
              </label>
              <Button className= "saveButton" onClick={handleUpdate}>Save</Button>
              <Button className= "backButton" onClick={handleBackButton}>Back</Button>
            </div>
            
          ) : (
            <div className="userProfileDisplay">
              <p className="usernameP">
                <strong>Username: </strong> {userData.username}
              </p>
              <p className="locationP">
                <strong>Location: </strong> {userData.location}
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
                <Button className="editButton" onClick={handleEdit}>
                  Edit
                </Button>
                <Button className="deleteButton" onClick={handleDelete}>
                  Delete Account
                </Button>
            </div>
          )}
          <Button className="signOutButton" onClick={handleSignOut}>
            Sign Out
          </Button>
       
        </>
      ) : (
        <div className="pageTitleUser">
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
              {/* <label>
                City:{" "}
                <input
                  type="text"
                  placeholder="Enter City"
                  name="city"
                  value={formData.city}
                  onChange={handleCityChange}
                />
              </label>
              <label>
                State:{" "}
                <input
                  type="text"
                  placeholder="Enter State 2-Digit Code"
                  name="state"
                  value={formData.state}
                  onChange={handleStateChange}
                />
              </label> */}
              <label>
                Country: <input 
                  type="text"
                  placeholder="Country Code"
                  name="location"
                  onChange={handleFormChange}
                />
              </label>
              <label className= "faveTeams">
                Favorite Teams:
                <Select
                defaultValue={[""]}
                placeholder="Select Team(s)"
                name="favoriteTeams"
                isMulti
                options={nflTeams}
                onChange= {handleTeamsChange}
                className="basic-multi-select"
                />
              </label>
            </>
          )}
          
          <Button className= "signUpButton" onClick={signUpMode ? handleSignUp : handleSignIn}>
            {signUpMode ? "Sign Up" : "Sign In"}
          </Button>
          <p className= "signUpFont">
            {signUpMode 
              ? "Already have an account?"
              : "Not registered? Sign up now!"}
            <Button className="signInButton" onClick={() => setSignUpMode(!signUpMode)}>
              {signUpMode ? "Sign In" : "Sign Up"}
            </Button>
          </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;