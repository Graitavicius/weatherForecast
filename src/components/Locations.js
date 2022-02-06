import { useEffect, useState } from "react";
import Location from "./Location";
import classes from "./Locations.module.css";
import Card from "../UI/Card";

const Locations = (props) => {
  const [locations, setLocations] = useState([]);
  const [resultsFound, setResultsFound] = useState(true);

  useEffect(() => {
    if (props.searchInput.trim() !== "") {
      let url = `https://foreca-weather.p.rapidapi.com/location/search/${props.searchInput}`;
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
          const transformedData = data.locations.map((locationData) => {
            return {
              name: locationData.name,
              country: locationData.country,
              id: locationData.id,
            };
          });
          if (transformedData.length === 0) {
            setResultsFound(false);
          } else {
            setResultsFound(true);
          }
          if (transformedData.length >= 5) {
            transformedData.length = 5;
          }
          return setLocations(transformedData);
        })

        .catch((err) => {
          console.error(err);
        });
    }
  }, [props.searchInput]);

  const onShowDetails = (id) => {
    props.onShowDetails(id);
  };

  return (
    <div>
      {!resultsFound && (
        <div className={classes["card-settings"]}>
          <Card>
            <p className={classes["found-no-results"]}>
              No locations found, try again please.
            </p>
          </Card>
        </div>
      )}
      <ul className={classes["location-list"]}>
        {locations.map((location) => (
          <li key={location.id} className={classes["location-list-item"]}>
            <Location
              onShowDetails={onShowDetails}
              id={location.id}
              name={location.name}
              country={location.country}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Locations;
