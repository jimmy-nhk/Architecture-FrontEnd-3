import React from "react";
// import theme from "../theme";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { Button } from "@material-ui/core";
import "./style.css";


function Post() {


  return (
    <Card className="card">
      <CardActionArea>
        <CardMedia
          className="media"
          image="https://www.kindpng.com/picc/m/276-2764257_instagram-icon-instagram-logo-small-size-hd-png.png"
          title="My Post"
        />

        <CardContent>
          <Typography gutterBottom variant="h5">My First Post</Typography>
          <Typography variant="body2">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
          <Button size="small" color="primary">Share</Button>
          <Button size="small" color="primary">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default Post;
