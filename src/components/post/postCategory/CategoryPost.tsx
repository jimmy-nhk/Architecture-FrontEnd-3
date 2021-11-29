import React from "react";
import Grid from "@mui/material/Grid";

import "./style.css";

function CategoryPost(props:any) {
  let category = props['category']
  

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
          <h2>{category.name}</h2>
          <p>{category.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CategoryPost;
