import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import WeatherChart from "../components/WeatherChart";

const forecast = (location, callback, callbackOnError) => {
  if (location) {
    console.log(`forecasting....${location}`);
    axios
      .get(`${process.env.VISUALCROSSING_API}/${location}`, {
        params: {
          unitGroup: "metric",
          key: process.env.VISUALCROSSING_KEY,
          contentType: "json",
        },
      })
      .then(
        (response) => {
          console.log(`returning data from forecast!`);
          callback(response);
        },
        (error) => {
          console.log(`Error on forecast!`);
          callbackOnError(error);
        }
      )
      .catch(function (error) {
        console.log(`Error on forecast!`);
        callbackOnError(error);
      });
  }
};

export default forecast;
