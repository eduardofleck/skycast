import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getHistoricData } from "../services/weatherService";
import { format } from "date-fns";
import LoadingButton from "@mui/lab/LoadingButton";

const OuterHistoricGrid = styled.div`
  //border: 1px solid black;
  display: grid;
  grid-template-rows: auto auto;
  grid-gap: 15px;
`;

const OuterHistoricControlsGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  grid-gap: 5px;
`;

export default function HistoricBanner(props) {
  var [isSpinnerOn, setIsSpinnerOn] = React.useState(false);
  var [dateStart, setDateStart] = React.useState(null);
  var [dateEnd, setDateEnd] = React.useState(null);
  var [historicData, setHistoricData] = React.useState([]);

  const getHistoricDataCallbackError = (error) => {
    console.log(`getCityCallbackError`);
    console.error(error);
    setIsSpinnerOn(false);
  };

  const getHistoricDataCallback = (data) => {
    console.log(`getHistoricDataCallback`);
    console.log(data);
    setHistoricData(data.data.days);
    setIsSpinnerOn(false);
  };

  const query = () => {
    if (dateStart != null && dateEnd != null && props.location != null) {
      setIsSpinnerOn(true);
      console.log("I`ll query historic data now...");
      getHistoricData(
        props.location,
        format(new Date(dateStart), "yyyy-MM-dd"),
        format(new Date(dateEnd), "yyyy-MM-dd"),
        getHistoricDataCallback,
        getHistoricDataCallbackError
      );
    }
  };

  const dataTable = () => {
    if (historicData != null && historicData.length > 0) {
      return (
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Max Temp</TableCell>
              <TableCell align="right">Min Temp</TableCell>
              <TableCell align="right">Feels like max</TableCell>
              <TableCell align="right">Feels like min</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historicData.map((historicRow) => (
              <TableRow key={historicRow.datetime}>
                <TableCell component="th" scope="row">
                  {historicRow.datetime}
                </TableCell>
                <TableCell align="right">{historicRow.tempmax}</TableCell>
                <TableCell align="right">{historicRow.tempmin}</TableCell>
                <TableCell align="right">{historicRow.feelslikemax}</TableCell>
                <TableCell align="right">{historicRow.feelslikemin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  };

  return (
    <OuterHistoricGrid>
      <OuterHistoricControlsGrid>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date start"
            value={dateStart}
            onChange={(newValue) => {
              setDateStart(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date end"
            value={dateEnd}
            onChange={(newValue) => {
              setDateEnd(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LoadingButton variant="outlined" onClick={query} loading={isSpinnerOn}>
          Query
        </LoadingButton>
      </OuterHistoricControlsGrid>
      {dataTable()}
    </OuterHistoricGrid>
  );
}
