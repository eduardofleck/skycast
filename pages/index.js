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
  var [forecastData, setForecastData] = React.useState(null);
  var [weather, setWeather] = React.useState(null);
  var [forecastLocation, setForecastLocation] = React.useState(null);

  const onForecast = (data) => {
    console.log(data.data);
    setForecastData(data.data);
    setWeather(data.data.currentConditions);
    setForecastLocation(data.data.address);
  };

  const ForecastChart = () => {
    {
      if (forecastData) {
        return (
          <WeatherChart
            maxValues={[10, 12, 15, 17, 18, 19]}
            minValues={[0, 6, 10, 12, 15, 9]}
            title="Forecast for the next 6 days"
            labels={["22/01", "23/01", "24/01", "25/01", "26/01", "27/01"]}
          />
        );
      }
    }
  };

  return (
    <div>
      <ForecastCity onForecast={onForecast}></ForecastCity>
      <WeatherBanner weather={weather} location={forecastLocation} />
    </div>
  );
}
