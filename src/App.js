import React, { useState } from "react";
import classes from "./App.module.css";
import MainPage from "./components/MainPage";
import Results from "./components/Results";

function App() {
  const [id, setId] = useState("");
  const getDetails = (details) => {
    setId(details);
  };

  return (
    <div className={classes["main-layout"]}>
      <MainPage onShowDetails={getDetails}></MainPage>
      <Results id={id}></Results>
    </div>
  );
}

export default App;
