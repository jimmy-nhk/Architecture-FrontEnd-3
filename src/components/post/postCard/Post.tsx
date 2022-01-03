import React, { useEffect, useState } from "react";
// import theme from "../theme";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./style.css";
import Box from '@mui/material/Box';
import { PostClass } from "../postContainer/PostContainer"

interface IPostProps {
  post: PostClass;
}

const Post: React.FC<IPostProps> = ({
  post
}) => {
  return (
    <Card className="cardPost">
      <Box sx={{width: "30%", height: "30%"}}>
        <CardMedia
            component="img"
            className="media"
            image={post.coverUrl}
            title="My Post"
            height="100%"
            width="100%"
          />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {post.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {post.tagline}
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
