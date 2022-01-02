import React, { useEffect, useState } from "react";
import Post from "../postCard/Post";
import "./style.css";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import axios, { AxiosResponse } from "axios";

export type ILikedUser = {
  id: number;
  uid: number;
};

// export type CommentUserClass = {
//   commentDTO: CommentClass,
//   userDTO: UserClass
// }
export type IPost = {
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
  likedUserList: Array<ILikedUser> | null;
  viewCount: number;
};

function PostContainer() {
  const [posts, setPosts] = useState<IPost[]>([
    {
      id: 2,
      userId: 2,
      title: "title 2 ne",
      bodyText: "<p>cone</p><p>oconte&nbsp;</p><p>ne</p>",
      category: "Computer Science",
      directors: "lulu; ",
      thumbnailURL: "",
      likedCount: 0,
      tagline: "tagline 2 ne",
      likedUserList: [{
        id: 1,
        uid: 1
      }],
      viewCount: 0
    }
  ]);

  const getPosts = () => {
    axios
      .get("http://localhost:8085/crud/getPost/pageNo=0&pageSize=20&asc=true")
      .then((response: AxiosResponse) => {
        // console.log(response.data.content);
        // var data: IPost[] | null = null;
        // data = response.data.content as IPost[]
        var data: IPost[] = [];
        var post = {
          id: 0,
          userId: 0,
          title: "",
          bodyText: "",
          category: "",
          directors: "",
          thumbnailURL: "",
          likedCount: 0,
          tagline: "",
          likedUserList: null,
          viewCount: 0,
        };
        // // {id, userId, title, bodyText, category, directors, thumbnailURL, likedCount, tagline, likedUserList, viewCount}
        response.data.content.map((x: any) => {
          console.log(x);
          post.id = x.id;
          post.title = x.title;
          post.userId = x.userId;
          post.bodyText = x.bodyText;
          post.category = x.category;
          post.directors = x.directors;
          post.thumbnailURL = x.thumbnailURL;
          post.likedCount = x.likedCount;
          post.tagline = x.tagline;
          post.likedUserList = x.likedUserList;
          post.viewCount = x.viewCount;
          console.log("post=", post);
          data.push(post);
        });
        // setPosts(data)
        // setPosts(response.data.content)
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

    console.log(posts);
    // getPosts();
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
          : posts.map((post, index) => (
              <Grid item xs={12} md={6}>
                <Link
                  className="post-item"
                  to="/post"
                  style={{ textDecoration: "none" }}
                >
                  {post}
                </Link>
              </Grid>
            ))}
      </Grid>
    </div>
  );
}

export default PostContainer;
