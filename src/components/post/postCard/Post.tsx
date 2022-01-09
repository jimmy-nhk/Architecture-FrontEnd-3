import React, { useEffect, useState } from "react";
// import theme from "../theme";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./style.css";
import Box from "@mui/material/Box";
import { PostClass } from "../postContainer/PostContainer";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

interface IPostProps {
  post: PostClass;
  userId: number | undefined;
}

const Post: React.FC<IPostProps> = ({ post, userId }) => {
  const [isLikedByUser, setIsLikedByUser] = useState(false);

  useEffect(() => {
    // console.log("userId=", userId)
    if (post.likedUserList?.some(x => x.uid === Number(userId)))
      setIsLikedByUser(true)
  }, [post])

  const handleLikeClick = () => {
    if (!userId) 
    return

    if (isLikedByUser) {
        axios.delete(`http://localhost:8085/crud/unlike/pid=${post.id}&uid=${userId}`)
        .then((response: AxiosResponse) => {
            console.log("Successfully UNLIKED postId " + post.id);
            setIsLikedByUser(false)
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        axios.post(`http://localhost:8085/crud/like/pid=${post.id}&uid=${userId}`)
        .then((response: AxiosResponse) => {
            console.log("Successfully LIKED postId " + post.id);
            setIsLikedByUser(true)
        })
        .catch((err) => {
            console.log(err);
        });
    }
  }

  return (
    <Card className="cardPost">
        <Link
          className="post-item"
          to={`/post/${post?.id}`}
          style={{ textDecoration: "none", fontFamily: "Arial", color: "#3B3B3B" }}
        >
        <Box sx={{ width: "30%", height: "30%" }}>
          <CardMedia className="media" title="My Post">
            <img
              src={post.coverUrl}
              style={{ width: "150px", height: "150px", margin: "10px" }}
            />
          </CardMedia>
        </Box>
      </Link>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            <Link
              className="post-item"
              to={`/post/${post?.id}`}
              style={{ textDecoration: "none", fontFamily: "Arial", color: "#3B3B3B" }}
            >
              {post.title}
            </Link>
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
            <Button size="small" color="primary" onClick={handleLikeClick}>
              {isLikedByUser ? 'Unlike' : 'Like'} 
            </Button>
            <Link
              className="post-item"
              to={`/post/${post?.id}`}
              style={{ textDecoration: "none" }}
            >
              <Button size="small" color="primary">
                Learn More
              </Button>
            </Link>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
};

export default Post;
