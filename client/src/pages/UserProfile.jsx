import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

const UserProfile = () => {
  const initialUserData = {
    username: "",
    name: {
      firstName: "",
      lastName: "",
    },
    location: {
      country: "",
      city: "",
      state: "",
    },
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
    location: {
      country: "",
      city: "",
    },
  };

  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [formData, setFormData] = useState(initialFormData);
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [stateLocation, setStateLocation] = useState("");
  const [editing, setEditing] = useState(false);
  const [signUpMode, setSignUpMode] = useState(false);

  const urlBase =
    import.meta.env.VITE_NODE_ENV === "production"
      ? import.meta.env.VITE_API_URL
      : "http://3.15.225.91:8080/api";

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
    { label: "San Francisco 49ers", value: "San Francisco 49ers" },
    { label: "Seattle Seahawks", value: "Seattle Seahawks" },
    { label: "Tampa Bay Buccaneers", value: "Tampa Bay Buccaneers" },
    { label: "Tennessee Titans", value: "Tennessee Titans" },
    { label: "Washington Commanders", value: "Washington Commanders" },
  ];

  const states = [
    { label: "AL", value: "AL" },
    { label: "AK", value: "AK" },
    { label: "AZ", value: "AZ" },
    { label: "AR", value: "AR" },
    { label: "CA", value: "CA" },
    { label: "CO", value: "CO" },
    { label: "CT", value: "CT" },
    { label: "DE", value: "DE" },
    { label: "FL", value: "FL" },
    { label: "GA", value: "GA" },
    { label: "HI", value: "HI" },
    { label: "ID", value: "ID" },
    { label: "IL", value: "IL" },
    { label: "IN", value: "IN" },
    { label: "IA", value: "IA" },
    { label: "KS", value: "KS" },
    { label: "KY", value: "KY" },
    { label: "LA", value: "LA" },
    { label: "ME", value: "ME" },
    { label: "MD", value: "MD" },
    { label: "MA", value: "MA" },
    { label: "MI", value: "MI" },
    { label: "MN", value: "MN" },
    { label: "MS", value: "MS" },
    { label: "MO", value: "MO" },
    { label: "MT", value: "MT" },
    { label: "NE", value: "NE" },
    { label: "NV", value: "NV" },
    { label: "NH", value: "NH" },
    { label: "NJ", value: "NJ" },
    { label: "NM", value: "NM" },
    { label: "NY", value: "NY" },
    { label: "ND", value: "ND" },
    { label: "NC", value: "NC" },
    { label: "OH", value: "OH" },
    { label: "OK", value: "OK" },
    { label: "OR", value: "OR" },
    { label: "PA", value: "PA" },
    { label: "RI", value: "RI" },
    { label: "SC", value: "SC" },
    { label: "SD", value: "SD" },
    { label: "TN", value: "TN" },
    { label: "TX", value: "TX" },
    { label: "UT", value: "UT" },
    { label: "VT", value: "VT" },
    { label: "VA", value: "VA" },
    { label: "WA", value: "WA" },
    { label: "WV", value: "WV" },
    { label: "WI", value: "WI" },
    { label: "WY", value: "WY" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    const isSignedIn = storedUserData !== null;

    setSignedIn(isSignedIn);

    if (isSignedIn) {
      setUserData(JSON.parse(storedUserData));
    } else {
      navigate("/user-profile");
    }
  }, [navigate]);

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

  const handleStateChange = (value) => {
    return setStateLocation(value);
  };

  const handleTeamsChange = (teams) => {
    setFavoriteTeams(
      teams.map((team) => ({
        id: uuidv4(),
        ...team,
      }))
    );
  };

  const handleBackButton = () => {
    setEditing(false);
  };

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

        const userResponse = await fetch(`${urlBase}/${formData.username}`);
        if (userResponse.status === 200) {
          const user = await userResponse.json();
          setUserData(user);
          sessionStorage.setItem("userData", JSON.stringify(user));
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
          location: {
            country: formData.country,
            city: formData.city,
            state: stateLocation.value,
          },
          favoriteTeams,
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
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          location: {
            country: formData.country,
            city: formData.city,
            state: stateLocation.value,
          },
          favoriteTeams,
        }),
      });

      if (res.status === 200) {
        const updatedUser = await res.json();
        setUserData(updatedUser);
        setEditing(false);
      }
    } catch (error) {
      console.error("Update Failed:", error.message, error.status);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${urlBase}/${formData.username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setSignedIn(false);
        setUserData(initialUserData);
        setFormData({
          username: "",
          password: "",
          confirmPassword: "",
        });
        sessionStorage.removeItem("userData");
      } else {
        console.error("Delete Failed:", res.statusText);
      }
    } catch (error) {
      console.error("Delete Failed:", error.message, error.status);
    }
  };

  return (
    <div className="profileMainDiv">
      {signedIn ? (
        <>
          <h3 className="profilePageTitle">{userData.username}'s Profile</h3>
          {editing ? (
            <div className="userProfileDisplay">
              <p className="nameProfile">
                <strong>Username:</strong> {userData.username}
              </p>
              <label>
                <strong>Password:</strong>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password: Min 8 characters"
                onChange={handleFormChange}
              />
              <p className="passwordFont">Min. password length 8 characters</p>
              <label>
                <strong>Confirm Password:</strong>{" "}
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleFormChange}
              />
              <label>
                <strong>City:</strong>{" "}
              </label>
              <input
                type="text"
                placeholder="Enter City"
                name="city"
                onChange={handleFormChange}
              />
              <label>
                <strong>State:</strong>
              </label>
              <Select
                placeholder="Select State"
                name="state"
                value={stateLocation}
                options={states}
                onChange={handleStateChange}
              />
              <label>
                <strong>Country:</strong>
              </label>
              <input
                type="text"
                placeholder="ex. US"
                name="country"
                onChange={handleFormChange}
              />
              <label>
                <strong>Favorite Teams:</strong>{" "}
              </label>
              <Select
                defaultValue={[""]}
                placeholder="Select Teams"
                name="favoriteTeams"
                isMulti
                options={nflTeams}
                onChange={handleTeamsChange}
                className="basic-multi-select"
              />
              <div className="profileButtons">
                <Button className="saveButton" onClick={handleUpdate}>
                  Save
                </Button>
                <Button className="backButton" onClick={handleBackButton}>
                  Back
                </Button>
              </div>
            </div>
          ) : (
            <div className="userProfileDisplay">
              <p className="usernameP">
                <strong>Name:</strong> {userData.name.firstName}{" "}
                {userData.name.lastName}
              </p>
              <p className="locationP">
                <strong>Location:</strong> {userData.location.Country},{" "}
                {userData.location.City}, {userData.location.State}
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
              <div className="profileButtons">
                <Button className="editButton" onClick={handleEdit}>
                  Edit Profile
                </Button>
                <Button className="deleteButton" onClick={handleDelete}>
                  Delete Account
                </Button>
              </div>
            </div>
          )}
          <Button className="signOutButton" onClick={handleSignOut}>
            Sign Out
          </Button>
        </>
      ) : (
        <div className="pageTitleUser">
          <h3 className="registrationFont">
            {signUpMode ? "Register" : "Sign In"}
          </h3>
          {signUpMode}{" "}
          <div className="signupFlex">
            <label>
              <strong>Username:</strong>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleFormChange}
            />
            <label>
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password: Min 8 characters"
              onChange={handleFormChange}
            />
            <p className="passwordFont">Min. password length 8 characters</p>
            {signUpMode && (
              <>
                <label>
                  <strong>Confirm Password:</strong>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleFormChange}
                />
                <label>
                  <strong>Email:</strong>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleFormChange}
                />
                <label>
                  <strong>First Name:</strong>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleFormChange}
                />
                <label>
                  <strong>Last Name:</strong>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleFormChange}
                />
                <label>
                  <strong>City:</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter City"
                  name="city"
                  onChange={handleFormChange}
                />
                <label>
                  <strong>State:</strong>
                </label>
                <Select
                  placeholder="Select State"
                  name="state"
                  options={states}
                  value={stateLocation}
                  onChange={handleStateChange}
                />
                <label>
                  <strong>Country:</strong>
                </label>
                <input
                  type="text"
                  placeholder="Country Code"
                  name="location"
                  onChange={handleFormChange}
                />
                <label>
                  <strong>Favorite Teams:</strong>
                </label>
                <Select
                  defaultValue={[""]}
                  placeholder="Select Team(s)"
                  name="favoriteTeams"
                  isMulti
                  options={nflTeams}
                  onChange={handleTeamsChange}
                />
              </>
            )}

            <Button
              className="signUpButton"
              onClick={signUpMode ? handleSignUp : handleSignIn}
            >
              {signUpMode ? "Sign Up" : "Sign In"}
            </Button>
            <p className="signUpFont">
              {signUpMode
                ? "Already have an account?"
                : "Not registered? Sign up now!"}
              <Button
                className="signInButton"
                onClick={() => setSignUpMode(!signUpMode)}
              >
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
