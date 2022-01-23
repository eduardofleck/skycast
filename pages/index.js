import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import WeatherChart from "../components/WeatherChart";
import forecast from "../services/weatherService";
import getCityByGeolocalization from "../services/geolocalizationService";

export default function Home() {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(
          `You gave us the permission to see your geolocalization. Thanks! Geolocalization: {${position.coords.latitude}, ${position.coords.latitude}}`
        );
      });
    } else {
      console.log("You denied us the permission to see your geolocalization.");
    }
  });

  var [location, setLocation] = React.useState("");
  var [forecastData, setForecastData] = React.useState("");

  const getForecast = (e) => {
    if (location) {
      forecast(location);
    }
  };

  const getCity = (e) => {
    getCityByGeolocalization(e);
  };

  const saveToState = (event) => {
    const { name, value } = event.target;

    setLocation(value);
  };

  return (
    <div>
      <TextField
        id="city"
        label="City"
        variant="outlined"
        defaultValue={location}
        onChange={saveToState}
      />
      <Button variant="outlined" onClick={getForecast}>
        Forecast!
      </Button>
      <Button variant="outlined" onClick={getCity}>
        Get city!
      </Button>
      <WeatherChart
        maxValues={[10, 12, 15, 17, 18, 19]}
        minValues={[0, 6, 10, 12, 15, 9]}
        title="Forecast for the next 6 days"
        labels={["22/01", "23/01", "24/01", "25/01", "26/01", "27/01"]}
      />
      ;
    </div>
  );
}
