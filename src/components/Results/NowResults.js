import React, { useState, useEffect } from "react";
import classes from "./NowResults.module.css";
import Card from "../../UI/Card";
import moment from "moment";
import snow from "../../assets/snow.svg";
import rain from "../../assets/rain.svg";
import showers from "../../assets/showers.svg";
import cloudy from "../../assets/cloudy.svg";
import clear from "../../assets/clear.svg";
import storm from "../../assets/storm.svg";
import overcast from "../../assets/overcast.svg";
import { capitalizeFirstLetter } from "../../utils/capitalize-first-letter";

const NowResults = (props) => {
  const [weatherNowInfo, setWeatherNowInfo] = useState();
  useEffect(() => {
    if (props.id) {
      const nowUrl = `https://foreca-weather.p.rapidapi.com/current/${props.id}?tempunit=C&windunit=MS&tz=Europe%2FLondon&lang=en`;
      fetch(nowUrl, {
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

          return setWeatherNowInfo(transformedData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [props.id]);

  return (
    <React.Fragment>
      {weatherNowInfo && (
        <div className={classes["today-weather"]}>
          <h3 className={classes.title}>Weather now</h3>
          <Card>
            <p className={classes.time}>
              {moment(weatherNowInfo.time).format("h:mm A, MMMM DD, YYYY")}
            </p>
            <h1 className={classes.temperature}>
              {weatherNowInfo.temperature}°C
            </h1>
            <div className={classes["logo-today"]}>
              {weatherNowInfo.symbolPhrase.includes("snow") && (
                <img src={snow} alt=""></img>
              )}
              {weatherNowInfo.symbolPhrase.includes("rain") && (
                <img src={rain} alt=""></img>
              )}
              {weatherNowInfo.symbolPhrase === "showers" && (
                <img src={showers} alt=""></img>
              )}
              {weatherNowInfo.symbolPhrase.includes("cloudy") && (
                <img src={cloudy} alt=""></img>
              )}
              {weatherNowInfo.symbolPhrase.includes("clear") && (
                <img src={clear} alt=""></img>
              )}
              {weatherNowInfo.symbolPhrase.includes("storm") && (
                <img src={storm} alt=""></img>
              )}
              {weatherNowInfo.symbolPhrase.includes("overcast") && (
                <img src={overcast} alt=""></img>
              )}
            </div>
            <p className={classes.description}>
              {capitalizeFirstLetter(weatherNowInfo.symbolPhrase)}
            </p>
            <div className={classes["weather-info"]}>
              <p className={classes.wind}>
                Wind Speed: {weatherNowInfo.windSpeed} m/s
              </p>
              <p className={classes.feeling}>
                Feels like: {weatherNowInfo.feelsLikeTemp} °C
              </p>
              <p className={classes.pressure}>
                Pressure: {weatherNowInfo.pressure} mb
              </p>
              <p className={classes.humidity}>
                Humidity: {weatherNowInfo.relHumidity}%
              </p>
            </div>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};

export default NowResults;
