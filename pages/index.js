import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import WeatherChart from "../components/WeatherChart";
import forecast from "../services/weatherService";
import getCityByGeolocalization from "../services/geolocalizationService";
import ForecastCity from "../components/ForecastCity";

export default function Home() {
  return (
    <div>
      <ForecastCity></ForecastCity>
    </div>
  );
}
