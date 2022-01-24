//import { useErrorStatus } from "./ErrorHandler";
import React, { Component } from "react";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";

const useQuery = (
  httpMethod,
  endpoint,
  body,
  callBackOnSuccess,
  callbackOnError
) => {
  const [apiData, setApiData] = React.useState();
  //const { setError } = useErrorStatus();
  const debug = process.env.DEBUG_ENABLED;

  React.useEffect(() => {
    if (debug == true) {
      console.log("You are seeing this because debug is enabled");
      console.log(
        `httpMethod: ${httpMethod}, endpoint: ${endpoint}, body: ${JSON.stringify(
          body
        )}, callBackOnSuccess is defined: ${callBackOnSuccess != null}`
      );
    }
    if (httpMethod.toUpperCase() === "POST") {
      trackPromise(
        axios
          .post(endpoint, body)
          .then((res) => {
            setApiData(res.data);
            console.log(callBackOnSuccess);
            if (callBackOnSuccess) {
              callBackOnSuccess(res.data);
            }
            if (debug == true) {
              console.log("Result data:");
              console.log(res.data);
            }
          })
          .catch(function (error) {
            if (debug == true) {
              console.log("Error:");
              console.log(error.message);
            }
            if (callbackOnError) {
              callbackOnError(error);
            }
            setError(error.message);
            return Promise.reject(error);
          })
      );
    } else if (httpMethod.toUpperCase() === "GET") {
      trackPromise(
        axios
          .get(endpoint)
          .then((res) => {
            setApiData(res.data);
            if (callBackOnSuccess) {
              callBackOnSuccess(res.data);
            }
            if (debug == true) {
              console.log("Result data:");
              console.log(res.data);
            }
          })
          .catch(function (error) {
            setError(error);
            return Promise.reject(error);
          })
      );
    } else if (httpMethod.toUpperCase() === "PATCH") {
      trackPromise(
        axios
          .patch(endpoint, body)
          .then((res) => {
            setApiData(res.data);
            if (debug == true) {
              console.log("Result data:");
              console.log(res.data);
            }
          })
          .catch(function (error) {
            setError(error.message);
            return Promise.reject(error);
          })
      );
    }
  }, [endpoint]);

  return [apiData || [], setApiData || []];
};

const usePostData = (endpoint, callback, callbackOnError) => {
  //const { setError } = useErrorStatus();

  const postData = (body) => {
    trackPromise(
      axios
        .post(endpoint, body)
        .then(
          (response) => {
            if (callback) {
              callback(response);
            }
          },
          (error) => {
            callbackOnError(error);
            setError(error.message);
            return Promise.reject(error);
          }
        )
        .catch(function (error) {
          callbackOnError(error);
          setError(error.message);
          return Promise.reject(error);
        })
    );
  };

  return postData;
};

const useGetData = (endpoint, params, callback, callbackOnError) => {
  trackPromise(
    axios
      .get(endpoint, params)
      .then(
        (response) => {
          if (callback) {
            callback(response);
          }
        },
        (error) => {
          callbackOnError(error);
          setError(error.message);
          return Promise.reject(error);
        }
      )
      .catch(function (error) {
        callbackOnError(error);
        setError(error.message);
        return Promise.reject(error);
      })
  );
};

const postData = (endpoint, body, callback, callbackOnError) => {
  trackPromise(
    axios
      .post(endpoint, body)
      .then(
        (response) => {
          if (callback) {
            callback(response);
          }
        },
        (error) => {
          callbackOnError(error);
          setError(error.message);
          return Promise.reject(error);
        }
      )
      .catch(function (error) {
        callbackOnError(error);
        setError(error.message);
        return Promise.reject(error);
      })
  );
};

const deleteData = (endpoint, callback, callbackOnError) => {
  trackPromise(
    axios
      .delete(endpoint)
      .then((res) => {
        if (callback) {
          callback(res);
        }
      })
      .catch(function (error) {
        if (callbackOnError) {
          callbackOnError(error);
        }
        setError(error.message);
        return Promise.reject(error);
      })
  );
};

const patchData = (endpoint, body, callbackOnSuccess) => {
  trackPromise(
    axios
      .patch(endpoint, body)
      .then((res) => {
        if (callbackOnSuccess) {
          callbackOnSuccess(res);
        }
      })
      .catch(function (error) {
        setError(error.message);
        return Promise.reject(error);
      })
  );
};

export { useQuery, usePostData, useGetData, patchData, postData, deleteData };
