import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import WeatherChart from "../components/WeatherChart";
import forecast from "../services/weatherService";
import getCityByGeolocalization from "../services/geolocalizationService";
import ForecastCity from "../components/ForecastCity";
import WeatherBanner from "../components/WeatherBanner";

export default function Home() {
  //var [forecastData, setForecastData] = React.useState(null);
  var [weather, setWeather] = React.useState(null);
  var [forecastLocation, setForecastLocation] = React.useState(null);
  var [forecast, setForecast] = React.useState(null);

  const onForecast = (data) => {
    console.log(data.data);
    //setForecastData(data.data);
    setWeather(data.data.currentConditions);
    setForecastLocation(data.data.address);
    setForecast(data.data.days);
  };

  return (
    <div>
      <ForecastCity onForecast={onForecast}></ForecastCity>
      <WeatherBanner weather={weather} location={forecastLocation} />
      <WeatherChart forecast={forecast} />
    </div>
  );
}
