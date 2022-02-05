import React, { useState, useEffect } from "react";
import classes from "./WeeklyResults.module.css";
import Card from "../../UI/Card";
import snow from "../../assets/snow.svg";
import rain from "../../assets/rain.svg";
import showers from "../../assets/showers.svg";
import cloudy from "../../assets/cloudy.svg";
import clear from "../../assets/clear.svg";
import storm from "../../assets/storm.svg";
import overcast from "../../assets/overcast.svg";
import { capitalizeFirstLetter } from "../../utils/capitalize-first-letter";

const WeeklyResults = (props) => {
  const [weatherWeeklyInfo, setWeatherWeeklyInfo] = useState([]);

  useEffect(() => {
    if (props.id) {
      const weeklyUrl = `https://foreca-weather.p.rapidapi.com/forecast/daily/${props.id}?alt=0&tempunit=C&windunit=MS&periods=8&dataset=full`;
      fetch(weeklyUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
          "x-rapidapi-key":
            "c6fc7a82b9msh4b76e83cad54f8bp13dcdejsn7420876b9d0e",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const transformedData = data.forecast.map((weeklyForecast) => {
            return {
              date: weeklyForecast.date,
              maxTemp: weeklyForecast.maxTemp,
              minTemp: weeklyForecast.minTemp,
              description: weeklyForecast.symbolPhrase,
            };
          });
          if (transformedData.length >= 7) {
            transformedData.length = 7;
          }
          return setWeatherWeeklyInfo(transformedData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [props.id]);

  return (
    <React.Fragment>
      {weatherWeeklyInfo.length > 0 && (
        <div className={classes["weekly-weather"]}>
          <h3 className={classes.title}>Weekly weather</h3>
          {weatherWeeklyInfo.map((weather) => (
            <div className={classes["one-day-weather"]} key={weather.date}>
              <Card>
                <div className={classes["each-day-weather"]}>
                  <div>
                    <p>{weather.date}</p>
                  </div>
                  <div className={classes["description-logo"]}>
                    <div className={classes.logo}>
                      {weather.description.includes("snow") && (
                        <img src={snow} alt=""></img>
                      )}
                      {weather.description.includes("rain") && (
                        <img src={rain} alt=""></img>
                      )}
                      {weather.description === "showers" && (
                        <img src={showers} alt=""></img>
                      )}
                      {weather.description.includes("cloudy") && (
                        <img src={cloudy} alt=""></img>
                      )}
                      {weather.description.includes("clear") && (
                        <img src={clear} alt=""></img>
                      )}
                      {weather.description.includes("storm") && (
                        <img src={storm} alt=""></img>
                      )}
                      {weather.description.includes("overcast") && (
                        <img src={overcast} alt=""></img>
                      )}
                    </div>
                    <div>
                      <p className={classes["weather-description"]}>
                        {capitalizeFirstLetter(weather.description)}
                      </p>
                    </div>
                  </div>

                  <div className={classes["min-max-temperature"]}>
                    <p className={classes["max-temperature"]}>
                      {weather.maxTemp}°C
                    </p>
                    <p className={classes["min-temperature"]}>
                      {weather.minTemp}°C
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default WeeklyResults;
