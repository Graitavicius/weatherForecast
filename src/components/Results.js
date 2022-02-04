import React, { useState, useEffect } from "react";
import classes from "./Results.module.css";
import Card from "../UI/Card";
import moment from "moment";

const Results = (props) => {
  const [weatherInfo, setWeatherInfo] = useState();
  useEffect(() => {
    if (props.id) {
      const url = `https://foreca-weather.p.rapidapi.com/current/${props.id}?tempunit=C&windunit=MS&tz=Europe%2FLondon&lang=en`;
      fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
          "x-rapidapi-key":
            "c6fc7a82b9msh4b76e83cad54f8bp13dcdejsn7420876b9d0e",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const transformedData = data.current;
          return setWeatherInfo(transformedData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [props.id]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <React.Fragment>
      {!weatherInfo && (
        <div className={classes["no-results"]}>
          <p className={classes.message}>
            Please enter and select a location to see weather forecast
          </p>
        </div>
      )}

      {weatherInfo && (
        <div className={classes.results}>
          <div className={classes["today-weather"]}>
            <h3 className={classes.title}>Weather today</h3>
            <Card>
              <p className={classes.time}>
                {moment(weatherInfo.time).format("h:mm A, MMMM DD, YYYY")}
              </p>
              <h1 className={classes.temperature}>
                {weatherInfo.temperature}°C
              </h1>
              <p className={classes.description}>
                {capitalizeFirstLetter(weatherInfo.symbolPhrase)}
              </p>
              <div className={classes["weather-info"]}>
                <p className={classes.wind}>
                  Wind Speed: {weatherInfo.windSpeed} m/s
                </p>
                <p className={classes.feeling}>
                  Feels like: {weatherInfo.feelsLikeTemp} C
                </p>
                <p className={classes.pressure}>
                  Pressure: {weatherInfo.pressure} mb
                </p>
                <p className={classes.humidity}>
                  Humidity: {weatherInfo.relHumidity}%
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Results;
