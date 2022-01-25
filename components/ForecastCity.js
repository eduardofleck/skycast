import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { getForecast } from "../services/weatherService";
import getCityByGeolocalization from "../services/geolocalizationService";
import styled from "styled-components";
import LoadingButton from "@mui/lab/LoadingButton";

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
  var [isSpinnerOn, setIsSpinnerOn] = React.useState(false);
  var [location, setLocation] = React.useState("");
  var [geoLocalizationEnabled, setGeoLocalizationEnabled] =
    React.useState(false);

  const getForecastCallbackError = (error) => {
    setIsSpinnerOn(false);
    console.log(`getCityCallbackError`);
    console.error(error);
  };

  const getForecastCallback = (data) => {
    setIsSpinnerOn(false);
    props.onForecast(data);
  };

  const onClickForecast = (e) => {
    if (location) {
      setIsSpinnerOn(true);
      getForecast(location, getForecastCallback, getForecastCallbackError);
    }
  };

  const getCityCallback = (city) => {
    console.log(`getCityCallback`);
    console.log(`setting location as ${city}`);
    setLocation(city);
    setGeoLocalizationEnabled(true);
    setIsSpinnerOn(false);
  };

  const getCityCallbackError = (error) => {
    console.log(`getCityCallbackError`);
    console.error(error);
    setIsSpinnerOn(false);
  };

  const getCity = (e) => {
    setIsSpinnerOn(true);
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
        <LoadingButton
          variant="outlined"
          loading={isSpinnerOn}
          onClick={getCity}
        >
          I`m Lost
        </LoadingButton>
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
          enabled={isSpinnerOn}
        />
        <ButtonsGrid>
          <LoadingButton
            variant="outlined"
            onClick={onClickForecast}
            loading={isSpinnerOn}
          >
            Forecast
          </LoadingButton>
          <ButtonImLost></ButtonImLost>
        </ButtonsGrid>
      </OuterGrid>
    </div>
  );
}
