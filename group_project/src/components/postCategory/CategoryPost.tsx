import React from "react";
import Grid from "@mui/material/Grid";

import "./style.css";

function CategoryPost() {
  return (
    <div
      style={{
        
        width: "31vw",
        textAlign: "center",
        justifyContent: "center",
        marginBottom: "2vw",
        marginRight: "2vw",
      }}
    >
      <div
        className="category-background-container"
        style={{ marginLeft: "25%", marginRight: "25%" }}
      >
        <div className="overlay"></div>
        <div className="text" style={{justifyItems: "center" }}>
          <h2>Engineering</h2>
          <p>The most innovative minds</p>
        </div>
      </div>
    </div>
  );
}

export default CategoryPost;
