import "./style.css";

import { Button, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PostClass } from "../postContainer/PostContainer";

// import theme from "../theme";
interface IPostProps {
  post: PostClass;
  userId: number | undefined;
  isProfilePage: boolean;
}

const Post: React.FC<IPostProps> = ({ post, userId, isProfilePage }) => {
  const [isLikedByUser, setIsLikedByUser] = useState(false);

  useEffect(() => {
    // console.log("userId=", userId)
    if (post.likedUserList?.some((x) => x.uid === Number(userId)))
      setIsLikedByUser(true);
  }, [post]);

  const handleLikeClick = () => {
    if (!userId) return;

    if (isLikedByUser) {
      axios
        .delete(
          `http://localhost:8085/crud/unlike/pid=${post.id}&uid=${userId}`
        )
        .then((response: AxiosResponse) => {
          console.log("Successfully UNLIKED postId " + post.id);
          setIsLikedByUser(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`http://localhost:8085/crud/like/pid=${post.id}&uid=${userId}`)
        .then((response: AxiosResponse) => {
          console.log("Successfully LIKED postId " + post.id);
          setIsLikedByUser(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Card className="cardPost">
      <Link
        className="post-item"
        to={`/post/${post?.id}`}
        style={{
          textDecoration: "none",
          fontFamily: "Arial",
          color: "#3B3B3B",
        }}
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
              style={{
                textDecoration: "none",
                fontFamily: "Arial",
                color: "#3B3B3B",
              }}
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
          {!isProfilePage ? (
            <CardActions>
              <Button size="small" color="primary" onClick={handleLikeClick}>
                {isLikedByUser ? "Unlike" : "Like"}
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
          ) : (
            <CardActions>
              <Link
                className="post-item"
                to={`/postEdit/${post?.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button size="small" color="primary">
                  Edit
                </Button>
              </Link>

              <Button size="small" color="primary">
                Delete
              </Button>
            </CardActions>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default Post;
