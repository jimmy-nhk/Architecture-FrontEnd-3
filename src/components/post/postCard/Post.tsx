import React from "react";
// import theme from "../theme";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./style.css";
import Box from '@mui/material/Box';

function Post() {
  return (
    <Card className="cardPost">
      <Box>
        <CardMedia
            component="img"
            className="media"
            image="/images/dummy-post.png"
            title="My Post"
            // height="400vw"
          />
      </Box>

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
            species, ranging across all continents except Antarctica Lizards are
            a widespread group of squamate reptiles, with over 6,000 species,
            ranging across all continents except Antarctica Lizards are a
            widespread group of squamate reptiles, with over 6,000 species,
            ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <CardActions>
            <Button size="small" color="primary">
              Like
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
}

export default Post;
