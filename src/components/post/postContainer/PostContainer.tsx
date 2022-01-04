import React, { useEffect, useState } from "react";
import Post from "../postCard/Post";
import "./style.css";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import axios, { AxiosResponse } from "axios";

export type LikedUserClass = {
  id: number;
  uid: number;
};

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

function PostContainer(props:any) {
  const PAGE_SIZE = 1
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<PostClass[]>([]);

  const getPosts = (pageNo:number, pageSize:number) => {
    axios
      .get(`http://localhost:8085/crud/getPost/pageNo=${pageNo}&pageSize=${pageSize}&asc=true`)
      .then((response: AxiosResponse) => {
        setTotalPages(response.data.totalPages)
        setPosts(response.data.content)
      });
  };

  useEffect(() => {
    getPosts(0, PAGE_SIZE);
    // console.log("PostContainer props category=", props.categoryId)
  }, []);

  useEffect(() => {
    getPosts(page - 1, PAGE_SIZE)
  }, [page])


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
                  to={`/post/${post.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Post key={post.id} post={post} />
                </Link>
              </Grid>
            ))}
      </Grid>
      <Pagination
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "0px auto 20px auto",
        }}
        count={totalPages}
        page={page}
        showFirstButton
        showLastButton
        onChange={(e:any, value:number) => setPage(value)}
      />
    </div>
  );
}

export default PostContainer;
