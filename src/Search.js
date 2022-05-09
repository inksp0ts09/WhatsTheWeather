import React, { useState } from "react";
import axios from "axios";
import SearchInfo from "./SearchInfo";
import WeatherForecast from "./WeatherForecast";

export default function Search(props) {
  let [ready, setReady] = useState(false);
  let [weatherData, setWeatherData] = useState({});
  let [city, setCity] = useState(props.defaultCity);

  function showWeather(response) {
    setWeatherData({
      city: response.data.name,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000)
    });
    setReady(true);
  }

  function Search() {
    let apiKey = "ab105665191c524adca45c6a735a2328";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    Search();
  }

  if (ready) {
    return (
      <div className="Search">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                className="form-control"
                onChange={updateCity}
              />
            </div>
            <div className="col-3 btn">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>

        <SearchInfo data={weatherData} />
        <WeatherForecast coordinates={weatherData.coordinates} />
      </div>
    );
  } else {
    Search();
    return "Loading...";
  }
}
