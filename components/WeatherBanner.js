import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function WeatherBanner(props) {
  if (props.weather) {
    return (
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {props.location}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {props.weather.conditions}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Temperature: {props.weather.temp}
            <br />
            Feels like: {props.weather.feelslike}
            <br />
            Humidity: {props.weather.humidity}%
            <br />
            Measurement time: {props.weather.datetime}
          </Typography>
        </CardContent>
      </Card>
    );
  } else return null;
}
