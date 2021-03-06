import React from "react";
import Box from "@mui/material/Box";
import CategoryPost from "../postCategory/CategoryPost";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

function CategoryContainer() {

  const categories = [
    {
      id: 1,
      name: "Engineering",
      description: "The most innovative minds",
    },
    {
      id: 2,
      name: "Design",
      description: "Intelligence made visible",
    },
    {
      id: 3,
      name: "Business",
      description: "Entrepreneurship begins",
    },
    {
      id: 4,
      name: "Professional Communication",
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
            <Grid key={category.id} item xs={12} md={6}>
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
