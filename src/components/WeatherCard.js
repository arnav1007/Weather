import React from "react";

const WeatherCard = ({ weather, title }) => {
  const dateBuilder = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="weather-box">
      <h3>{title}</h3>
      <div className="location">
        {weather.name}, {weather.sys.country}
      </div>
      <div className="date">{dateBuilder(new Date())}</div>
      <div className="temp">{Math.round(weather.main.temp)}°c</div>
      <div className="weather">{weather.weather[0].main}</div>
    </div>
  );
};

export default WeatherCard;
