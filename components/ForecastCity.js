import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import WeatherChart from "../components/WeatherChart";
import forecast from "../services/weatherService";
import getCityByGeolocalization from "../services/geolocalizationService";
import styled from "styled-components";
//import { useGetData } from "../services/useQuery";

const OuterGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  align-items: center;
  margin: 10px;
  grid-gap: 10px;
`;

const ButtonsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  grid-gap: 10px;
`;

export default function ForecastCity(props) {
  var [location, setLocation] = React.useState("");
  var [geoLocalizationEnabled, setGeoLocalizationEnabled] =
    React.useState(false);

  const getForecastCallbackError = (error) => {
    console.log(`getCityCallbackError`);
    console.error(error);
  };

  const getForecast = (e) => {
    if (location) {
      forecast(location, props.onForecast, getForecastCallbackError);
    }
  };

  const getCityCallback = (city) => {
    console.log(`getCityCallback`);
    console.log(`setting location as ${city}`);
    setLocation(city);
    setGeoLocalizationEnabled(true);
  };

  const getCityCallbackError = (error) => {
    console.log(`getCityCallbackError`);
    console.error(error);
  };

  const getCity = (e) => {
    getCityByGeolocalization(getCityCallback, getCityCallbackError);
  };

  const saveToState = (event) => {
    const { name, value } = event.target;

    setLocation(value);
  };

  React.useEffect(() => {
    console.log("getCity");
    getCity();
  }, []);

  const ButtonImLost = () => {
    if (!geoLocalizationEnabled)
      return (
        <Button variant="outlined" onClick={getCity}>
          I`m Lost
        </Button>
      );
    else return null;
  };

  return (
    <div>
      <OuterGrid>
        <TextField
          id="city"
          label="City"
          variant="outlined"
          value={location}
          onChange={saveToState}
        />
        <ButtonsGrid>
          <Button variant="outlined" onClick={getForecast}>
            Forecast
          </Button>
          <ButtonImLost></ButtonImLost>
        </ButtonsGrid>
      </OuterGrid>
    </div>
  );
}
