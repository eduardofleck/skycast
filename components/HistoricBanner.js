import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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

const OuterHistoricGrid = styled.div`
  //border: 1px solid black;
  display: grid;
  grid-template-rows: auto auto;
  grid-gap: 15px;
`;

const OuterHistoricControlsGrid = styled.div`
  //border: 1px solid black;
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  grid-gap: 5px;
`;

export default function HistoricBanner() {
  var [dateStart, setDateStart] = React.useState(null);
  var [dateEnd, setDateEnd] = React.useState(null);
  var [historicData, setHistoricData] = React.useState([]);

  const getHistoricDataCallbackError = (error) => {
    console.log(`getCityCallbackError`);
    console.error(error);
  };

  const getHistoricDataCallback = (data) => {
    console.log(`getHistoricDataCallback`);
    console.log(data);
    setHistoricData(data.data.days);
  };

  const query = () => {
    if (dateStart != null && dateEnd != null) {
      console.log("I`ll query historic data now...");
      getHistoricData(
        "Novo Hamburgo",
        format(new Date(dateStart), "yyyy-MM-dd"),
        format(new Date(dateEnd), "yyyy-MM-dd"),
        getHistoricDataCallback,
        getHistoricDataCallbackError
      );
    }
  };

  return (
    <Card>
      <CardContent>
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
            <Button variant="outlined" onClick={query}>
              Query
            </Button>
          </OuterHistoricControlsGrid>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
                  <TableCell align="right">
                    {historicRow.feelslikemax}
                  </TableCell>
                  <TableCell align="right">
                    {historicRow.feelslikemin}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </OuterHistoricGrid>
      </CardContent>
    </Card>
  );
}
