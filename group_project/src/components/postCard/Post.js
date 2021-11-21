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
import photo from "../../images/dummy-post.png";
import Box from '@mui/material/Box';

function Post() {
  return (


    <Card sx={{ display: "flex" }} className="cardPost">
            <CardMedia
        component="img"
          className="media"
          image={photo}
          title="My Post"
          height="500vh"
          
        />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
          My First Post
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
         <CardActions>
           <Button size="small" color="primary">Like</Button>
           <Button size="small" color="primary">Learn More</Button>
       </CardActions>
       </Box>
      </Box>


    </Card>
  );
}

export default Post;
