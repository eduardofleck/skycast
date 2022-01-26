import React, { useState, useEffect } from "react";
import WeatherChart from "../components/WeatherChart";
import ForecastCity from "../components/ForecastCity";
import WeatherBanner from "../components/WeatherBanner";
import styled from "styled-components";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import HistoricBanner from "../components/HistoricBanner";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OuterGrid = styled.div`
  //border: 1px solid black;
  display: grid;
  grid-template-rows: auto auto auto auto;
  grid-gap: 15px;
`;

export default function Home() {
  //var [forecastData, setForecastData] = React.useState(null);
  var [weather, setWeather] = React.useState(null);
  var [forecastLocation, setForecastLocation] = React.useState(null);
  var [forecast, setForecast] = React.useState(null);
  var [historicForecast, setHistoricForecast] = React.useState("forecast");
  var [isSnackBarOpen, setIsSnackBarOpen] = React.useState(false);
  var [error, setError] = React.useState("");

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
        <div>
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
        </div>
      );
  };

  const forecastHistoric = () => {
    if (historicForecast === "historic") {
      return <HistoricBanner location={forecastLocation} />;
    } else {
      let days = forecast ? forecast.length : 0;
      return (
        <WeatherChart
          forecast={forecast}
          title={`Weather forecast for the next ${days} days`}
        />
      );
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackBarOpen(false);
  };

  const onError = (error) => {
    setError(error);
    setIsSnackBarOpen(true);
  };

  return (
    <OuterGrid>
      <ForecastCity onForecast={onForecast} onError={onError}></ForecastCity>
      <WeatherBanner weather={weather} location={forecastLocation} />
      {buttons()}
      {forecastHistoric()}
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </OuterGrid>
  );
}
