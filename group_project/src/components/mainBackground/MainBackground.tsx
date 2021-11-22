import { Skeleton } from "@mui/material";
import React from "react";
import main_background from "../../images/main_background.jpg";
import "./style.css";

function MainBackground() {
  return (
    <div>
      <div className="main-background-container">
        <div className="overlay"></div>
        <div className="text-container">
          <h2>Enginneering</h2>
          <p>The most innovative minds</p>
        </div>
      </div>
    </div>
  );
}

export default MainBackground;
