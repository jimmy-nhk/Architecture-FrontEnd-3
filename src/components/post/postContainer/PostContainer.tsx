import React, { useEffect, useState } from "react";
import Post from "../postCard/Post";
import "./style.css";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import axios, { AxiosResponse } from "axios";

export type LikedUserClass = {
  id: number;
  uid: number;
};

// export type CommentUserClass = {
//   commentDTO: CommentClass,
//   userDTO: UserClass
// }
export type PostClass = {
  // {id, userId, title, bodyText, category, directors, thumbnailURL, likedCount, tagline, likedUserList, viewCount}
  id: number;
  userId: number | null;
  title: string;
  bodyText: string;
  category: string;
  directors: string;
  coverUrl: string;
  tags: string;
  likedCount: number;
  tagline: string;
  likedUserList: Array<LikedUserClass> | null;
  viewCount: number;
};

function PostContainer() {
  const [posts, setPosts] = useState<PostClass[]>([]);

  const getPosts = () => {
    axios
      .get("http://localhost:8085/crud/getPost/pageNo=0&pageSize=20&asc=true")
      .then((response: AxiosResponse) => {
        setPosts(response.data.content)
      });
  };

  useEffect(() => {
    getPosts();
    console.log(posts);
  }, []);

  return (
    <div>
      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className="posts"
      >
        {!posts
          ? null
          : posts.map((post) => (
              <Grid item xs={12} md={6} key={post.id}>
                <Link
                  className="post-item"
                  to="/post"
                  style={{ textDecoration: "none" }}
                >
                  <Post key={post.id} post={post} />
                </Link>
              </Grid>
            ))}
      </Grid>
    </div>
  );
}

export default PostContainer;
