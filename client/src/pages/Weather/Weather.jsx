import React, { useEffect, useState } from "react"
import "./Weather.css"
// import axios from "axios"
import axios from "axios"
import { WEATHER_API_KEY } from "../../configs/constants"
import clear from "../../components/images/clear.png"
import clouds from "../../components/images/clouds.png"
import drizzle from "../../components/images/drizzle.png"
import humidity from "../../components/images/humidity.png"
import mist from "../../components/images/mist.png"
import rain from "../../components/images/rain.png"
import search from "../../components/images/search.png"
import snow from "../../components/images/snow.png"
import wind from "../../components/images/wind.png"

// As a user, I want to be able to check for local weather
// As a user, I want to be able to check the weather of another location using a zip code
// As a user, I want to be able to save my location so weather is automatically displayed during my session

const Weather = () => {
  const [data, setData] = useState({})
  const [location, setLocation] = useState("")
  const [currentLocation, setCurrentLocation] = useState({})

  // const geoLocationAPI_key = `bfdf72489b14421ca50d45c76c24e1af`

  // const api_key = "ad60d9877bba5e3a05f21f39c17485e3"
  // location: {city name}
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${location},us&units=imperial&appid=ad60d9877bba5e3a05f21f39c17485e3`
  

  const getApiUrlWithLatLong = (lat, long) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=ad60d9877bba5e3a05f21f39c17485e3`

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const geoLocationAPI_url = `https:api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=bfdf72489b14421ca50d45c76c24e1af`
        const url = getApiUrlWithLatLong(latitude, longitude);
        // axios
        //   .get(geoLocationAPI_url)
        //   .then((res) => {
        //     // setData(res.data)
        //     console.log(res.data)
        //     setLocation(res.data.results[0]?.components?.postcode);
        //     setCurrentLocation(res.data.results[0]?.geometry);
        axios.get(url)
          // })
          .then((res) => {
            setData(res.data)
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
            console.error("Error getting data")
          })
      })
    }
  }, [])

  const handleSearchInput = (event) => {
    event.preventDefault()
    axios
      .get(api_url)
      .then((res) => {
        setData(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.error("Error getting data")
      })

    setLocation("")
  }

  const getForecastImage = (weather) => {
    if (weather === "Drizzle") {
      return drizzle
    }
    if (weather === "Clouds") {
      return clouds
    }
    if (weather === "Clear") {
      return clear
    }
    if (weather === "Snow") {
      return snow
    }
    if (weather === "Rain") {
      return rain
    }
    if (weather === "Mist") {
      return mist
    }
  }

  return (
    <div className="weather-container">
      <div className="search">
        <form on onSubmit={handleSearchInput}>
          {" "}
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            type="text"
            className="search-input"
            placeholder="Enter Location"
            spellCheck="false"
          />
          <button type="submit">
            <img src={search} alt="search bar" />
          </button>
        </form>
      </div>

      <div className="weather-details">
        {data.weather ? (
          <img
            src={getForecastImage(data.weather[0].main)}
            alt="clear-icon"
            className="forecast"
          />
        ) : null}

        {data.weather ? <p>{data.weather[0].main}</p> : null}
        <div className="temp">
          {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          <p className="city-name">{data.name}</p>
        </div>
        <div className="city-details">
          <div className="col">
            <img src={humidity} alt="" />
            <div className="humidity">
              <h2>Humidity</h2>
              {data.main ? <h2>{data.main.humidity}%</h2> : null}
            </div>
          </div>

          <div className="col">
            <img src={wind} alt="wind-icon" />
            <div className="wind">
              <h2>Wind</h2>
              {data.wind ? <h2>{data.wind.speed.toFixed()}MPH</h2> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
