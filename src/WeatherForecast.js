import React, { useState } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDaily from "./WeatherForecastDaily";

export default function WeatherForcast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map(function (dailyForecast, index) {
            return (
              <div className="col" key={index}>
                <WeatherForecastDaily data={dailyForecast} />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    let apiKey = "ab105665191c524adca45c6a735a2328";
    let longitude = props.coordinates.lon;
    let latitude = props.coordinates.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

    axios.get(apiUrl).then(handleResponse);

    return null;
  }
}
