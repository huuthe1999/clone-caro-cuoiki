import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./muiStyle";
import "./index.css";

function Home() {
  const classes = useStyles();
  let history = useHistory();

  return <div className="home-container">HOME</div>;
}

export default Home;
