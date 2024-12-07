import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  
  const fetchWeatherByLocation = (lat, lon) => {
    fetch(
      `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      })
      .catch((err) => {
        console.error("Error fetching weather data by location:", err);
      });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to retrieve your location. Please search manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        })
        .catch((err) => {
          console.error("Error fetching weather data by city name:", err);
        });
    }
  };

  return (
    <div
      className={
        weather && weather.main && weather.main.temp > 16 ? "app warm" : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {weather && weather.main && (
          <WeatherCard weather={weather} title="Current Weather" />
        )}
      </main>
    </div>
  );
}

export default App;
