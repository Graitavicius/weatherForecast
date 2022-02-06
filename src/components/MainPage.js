import Locations from "./Locations";
import classes from "./MainPage.module.css";
import { useState, useRef } from "react";

const MainPage = (props) => {
  const searchInputRef = useRef();
  const [searchInput, setSearchInput] = useState("");
  const [searchInputValid, setSearchInputValid] = useState(true);

  const searchLocations = (event) => {
    event.preventDefault();
    if (
      searchInputRef.current.value.trim() === "" ||
      searchInputRef.current.value.length > 30
    ) {
      setSearchInputValid(false);
      return;
    } else {
      setSearchInputValid(true);
      setSearchInput(searchInputRef.current.value);
    }
  };

  const onShowDetails = (id) => {
    props.onShowDetails(id);
  };

  const mainPageClasses =
    searchInput === ""
      ? classes["main-page"]
      : `${classes["main-page"]} ${classes["found-results"]}`;

  return (
    <div className={mainPageClasses}>
      <h1 className={classes.title}>The only weather forecast you need</h1>
      <div className={classes.form}>
        <form className={classes["form-control"]} onSubmit={searchLocations}>
          <input
            ref={searchInputRef}
            className={classes["search-input"]}
            placeholder="Please enter the location..."
            type="text"
          />
          <button className={classes["search-button"]}>Search</button>
          {!searchInputValid && (
            <p className={classes.invalid}>
              Search Input can't be empty or more than 30 symbols
            </p>
          )}
        </form>
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
