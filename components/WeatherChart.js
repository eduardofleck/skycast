import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OuterGridChart = styled.div`
  height: 400px;
`;

export default function WeatherChart(props) {
  if (props.forecast) {
    let labels = [];
    let maxValues = [];
    let minValues = [];

    props.forecast.forEach((day) => {
      labels.push(
        `${day.datetime.toString().substring(8)}/${day.datetime
          .toString()
          .substring(5, 7)}`
      );
      maxValues.push(day.tempmax);
      minValues.push(day.tempmin);
    });

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: props.title,
        },
      },
    };

    let data = {
      labels,
      datasets: [
        {
          label: "Max",
          data: maxValues,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Min",
          data: minValues,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };

    return (
      <OuterGridChart>
        <Line options={options} data={data} />
      </OuterGridChart>
    );
  } else return null;
}
