import axios from "axios";

const getForecast = (location, callback, callbackOnError) => {
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

const getHistoricData = (
  location,
  dateStart,
  dateEnd,
  callback,
  callbackOnError
) => {
  if (location) {
    console.log(`historic data....${location}`);
    axios
      .get(
        `${process.env.VISUALCROSSING_API}/${location}/${dateStart}/${dateEnd}`,
        {
          params: {
            unitGroup: "metric",
            include: "days",
            key: process.env.VISUALCROSSING_KEY,
            contentType: "json",
          },
        }
      )
      .then(
        (response) => {
          console.log(`returning historic data!`);
          callback(response);
        },
        (error) => {
          console.log(`Error on historic data!`);
          callbackOnError(error);
        }
      )
      .catch(function (error) {
        console.log(`Error on historic data!`);
        callbackOnError(error);
      });
  }
};

export { getHistoricData, getForecast };
