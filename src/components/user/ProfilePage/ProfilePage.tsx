import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Avatar, Card, CardHeader, Container, Grid } from "@mui/material";
import DefaultLayout from "../../generic/layout/DefaultLayout";
import { PostClass } from "../../post/postContainer/PostContainer";
import axios, { AxiosResponse } from "axios";
import Post from "../../post/postCard/Post";

function ProfilePage() {
  const PAGE_SIZE = 1
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState<any>()
  const [posts, setPosts] = useState<PostClass[]>([]);

  const getUserInformation = (userId:string) => {
    axios
      .get(`USER_INFORMATION_FETCHING_API`)
      .then((response: AxiosResponse) => {
        // setUser()
      });
  };

  const getPosts = (pageNo:number, pageSize:number) => {
    axios
      .get(`USER_POSTS_FETCH_API`)
      .then((response: AxiosResponse) => {
        setTotalPages(response.data.totalPages)
        setPosts(response.data.content)
      });
  };

  useEffect(() => {
    // getUser() // please pass user id in
    getPosts(0, PAGE_SIZE);
  }, []);

  useEffect(() => {
    getPosts(page - 1, PAGE_SIZE)
  }, [page])

  return (
    <DefaultLayout style={{ backgroundColor: "#f3f3f4" }}>
      <Container maxWidth="lg" sx={{ padding: "6.5rem 0", margin: "0 auto" }}>
        <Card sx={{marginTop: "3rem"}}>
          <CardHeader
            avatar={
              <Avatar src={user.avatar ?? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&fm=jpg&crop=faces&fit=crop&h=32&w=32"}>
              </Avatar>
            }
            title={user.name ?? "John Doe"}
            subheader={user.major ?? "BH120 - Software Engineering"}
          />
        </Card>
        <Grid
          rowSpacing={4}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="posts"
        >
          {!posts
            ? (<p>Loading...</p>)
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
      </Container>
    </DefaultLayout>
  );
}

export default ProfilePage;
