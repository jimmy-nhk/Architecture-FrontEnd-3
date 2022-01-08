import React from "react";
import Box from "@mui/material/Box";
import CategoryPost from "../postCategory/CategoryPost";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

function CategoryContainer() {

  const categories = [
    {
      id: 1,
      name: "Engineering".toUpperCase(),
      description: "The most innovative minds",
    },
    {
      id: 2,
      name: "Design".toUpperCase(),
      description: "Intelligence made visible",
    },
    {
      id: 3,
      name: "Business".toUpperCase(),
      description: "Entrepreneurship begins",
    },
    {
      id: 4,
      name: "Professional Communication".toUpperCase(),
      description: "Public relation made compelling",
    },
  ];

  return (
    <div style={{ backgroundColor: "gray" }}>
      <div style={{ width: "100%", maxWidth: "1280px", margin: "auto" }}>
        <div
          style={{ paddingTop: "150px", textAlign: "center", color: "white" }}
        >
          <h1>Choose a school to view its projects:</h1>
        </div>
        <Grid container style={{ padding: "0 0 50px 0" }}>
          {categories.map((category) => ( 
            <Grid item xs={12} md={6}>
              <Link to={`/posts/` + category.name}>
                <CategoryPost category={category} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default CategoryContainer;
