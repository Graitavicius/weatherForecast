import React from "react";
import classes from "./Results.module.css";

import WeeklyResults from "./WeeklyResults";
import NowResults from "./NowResults";

const Results = (props) => {
  return (
    <React.Fragment>
      <div className={classes.results}>
        <NowResults id={props.id} />
        <WeeklyResults id={props.id} />
      </div>
    </React.Fragment>
  );
};

export default Results;
