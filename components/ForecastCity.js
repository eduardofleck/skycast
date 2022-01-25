import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getForecast } from "../services/weatherService";
import getCityByGeolocalization from "../services/geolocalizationService";
import styled from "styled-components";

const OuterGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  align-items: center;
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

  const onClickForecast = (e) => {
    if (location) {
      getForecast(location, props.onForecast, getForecastCallbackError);
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
          <Button variant="outlined" onClick={onClickForecast}>
            Forecast
          </Button>
          <ButtonImLost></ButtonImLost>
        </ButtonsGrid>
      </OuterGrid>
    </div>
  );
}
