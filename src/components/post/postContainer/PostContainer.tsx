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
  thumbnailURL: string;
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
        // var data: PostClass[] = [];
        // var post = {
        //   id: 0,
        //   userId: 0,
        //   title: "",
        //   bodyText: "",
        //   category: "",
        //   directors: "",
        //   thumbnailURL: "",
        //   likedCount: 0,
        //   tagline: "",
        //   likedUserList: null,
        //   viewCount: 0,
        // };
        // // {id, userId, title, bodyText, category, directors, thumbnailURL, likedCount, tagline, likedUserList, viewCount}
        // response.data.content.map((x: any) => {
        //   post.id = x.id;
        //   post.title = x.title;
        //   post.userId = x.userId;
        //   post.bodyText = x.bodyText;
        //   post.category = x.category;
        //   post.directors = x.directors;
        //   post.thumbnailURL = x.thumbnailURL;
        //   post.likedCount = x.likedCount;
        //   post.tagline = x.tagline;
        //   post.likedUserList = x.likedUserList;
        //   post.viewCount = x.viewCount;
        //   data.push(post);
        //   console.log("post=", post);
        // });
        setPosts(response.data.content)
      });
  };

  useEffect(() => {
    // const children = [];
    // var children:IPost[]
    // children = getPosts();
    // console.log(getPosts())
    // let i;
    // for (i = 0; i < 10; i++) {
    //   children.push(<Post key={i} />);
    // }

    // setPosts(children);

    getPosts();
    console.log(posts);
  }, []);

  useEffect(() => {
    const children = [];
    let i;
    for (i = 0; i < 10; i++) {
      children.push(<Post key={i} />);
    }

    console.log(posts);
  }, [posts]);

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
                  <Post key={post.id} />
                </Link>
              </Grid>
            ))}
      </Grid>
    </div>
  );
}

export default PostContainer;
