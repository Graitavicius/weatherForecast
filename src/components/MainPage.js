import Locations from "./Locations";
import classes from "./MainPage.module.css";
import { useState, useRef } from "react";

const MainPage = (props) => {
  const searchInputRef = useRef();
  const [searchInput, setSearchInput] = useState("");

  const searchLocations = () => {
    setSearchInput(searchInputRef.current.value);
  };

  const onShowDetails = (id) => {
    props.onShowDetails(id);
  };

  const mainPageClasses =
    searchInput === ""
      ? classes["main-page"]
      : `${classes["main-page"]} ${classes["no-results"]}`;

  return (
    <div className={mainPageClasses}>
      <h1 className={classes.title}>The only weather forecast you need</h1>
      <div>
        <input
          ref={searchInputRef}
          className={classes["search-input"]}
          placeholder="Please enter the location..."
          type="text"
        />
        <button
          onClick={searchLocations}
          type="button"
          className={classes["search-button"]}
        >
          Search
        </button>
      </div>
      <div className={classes.locations}>
        <Locations
          onShowDetails={onShowDetails}
          searchInput={searchInput}
        ></Locations>
      </div>
    </div>
  );
};

export default MainPage;
