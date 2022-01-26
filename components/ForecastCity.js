import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { getForecast } from "../services/weatherService";
import getCityByGeolocalization from "../services/geolocalizationService";
import styled from "styled-components";
import LoadingButton from "@mui/lab/LoadingButton";
import Autocomplete from "@mui/material/Autocomplete";

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

const localStorageKey = "#previousSearches#";

export default function ForecastCity(props) {
  var [isSpinnerOn, setIsSpinnerOn] = React.useState(false);
  var [location, setLocation] = React.useState("");
  var [previousSearches, setPreviousSearches] = React.useState([]);
  var [geoLocalizationEnabled, setGeoLocalizationEnabled] =
    React.useState(false);

  const getForecastCallbackError = (error) => {
    setIsSpinnerOn(false);
    console.error(error);
    props.onError("I was not able to find your city :(");
  };

  const getForecastCallback = (data) => {
    setIsSpinnerOn(false);
    props.onForecast(data);
    if (
      data.data.address != null &&
      !previousSearches.includes(data.data.address)
    ) {
      let prevS = previousSearches;
      prevS.push(data.data.address);
      setPreviousSearches([...prevS]);
      window.localStorage.setItem(localStorageKey, prevS);
    }
  };

  const onClickForecast = (e) => {
    if (location) {
      setIsSpinnerOn(true);
      getForecast(location, getForecastCallback, getForecastCallbackError);
    }
  };

  const getCityCallback = (city) => {
    console.log(`setting location as ${city}`);
    setLocation(city);
    setGeoLocalizationEnabled(true);
    setIsSpinnerOn(false);
  };

  const getCityCallbackError = (error) => {
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
    getCity();

    let value = window.localStorage.getItem(localStorageKey);
    console.log(`got value ${value} on session ${localStorageKey}`);
    if (value && value.length > 0) setPreviousSearches(value.split(","));
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
        <Autocomplete
          id="grouped-querys"
          value={location}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              setLocation(newValue);
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setLocation(newValue.inputValue);
            } else {
              setLocation(newValue);
            }
          }}
          options={previousSearches}
          groupBy={(option) => "Previous Searches"}
          getOptionLabel={(option) => option}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              id="city"
              variant="outlined"
              label="City"
              onChange={saveToState}
            />
          )}
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
