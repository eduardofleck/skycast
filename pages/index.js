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
import ButtonGroup from "@mui/material/ButtonGroup";
import styled from "styled-components";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

const OuterButtonsGrid = styled.div`
  margin-top: 20px;
`;

export default function Home() {
  //var [forecastData, setForecastData] = React.useState(null);
  var [weather, setWeather] = React.useState(null);
  var [forecastLocation, setForecastLocation] = React.useState(null);
  var [forecast, setForecast] = React.useState(null);
  var [historicForecast, setHistoricForecast] = React.useState("forecast");

  const onForecast = (data) => {
    console.log(data.data);
    setWeather(data.data.currentConditions);
    setForecastLocation(data.data.address);
    setForecast(data.data.days);
  };

  const onChangeHistoricForecast = (event, newValue) => {
    console.log(newValue);
    setHistoricForecast(newValue);
  };

  const buttons = () => {
    if (forecast)
      return (
        <OuterButtonsGrid>
          <ToggleButtonGroup
            variant="outlined"
            value={historicForecast}
            color="primary"
            exclusive
            onChange={onChangeHistoricForecast}
          >
            <ToggleButton value="forecast">Forecast</ToggleButton>
            <ToggleButton value="historic">Historic</ToggleButton>
          </ToggleButtonGroup>
        </OuterButtonsGrid>
      );
  };

  const weatherchart = () => {
    if (historicForecast === "historic") {
      return null;
    } else {
      return <WeatherChart forecast={forecast} />;
    }
  };

  return (
    <div>
      <ForecastCity onForecast={onForecast}></ForecastCity>
      <WeatherBanner weather={weather} location={forecastLocation} />
      {buttons()}
      {weatherchart()}
    </div>
  );
}
