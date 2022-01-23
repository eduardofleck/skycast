import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import WeatherChart from "../components/WeatherChart";

const forecast = (location) => {
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
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch(function (error) {
        console.log(error);
      });
  }
};

export default forecast;
