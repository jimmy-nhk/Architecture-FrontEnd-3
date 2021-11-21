import React, { useEffect, useState } from "react";
import Post from "../postCard/Post";
import "./style.css";
import Grid from "@mui/material/Grid";

function PostContainer() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {


    const children = [];
    let i;
    for (i = 0; i < 100; i++) {
      children.push(<Post />);
    }

    setPosts(children);

    console.log(posts);
  }, []);

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="post-container">

        {posts.map((post) => {
          return <Grid item item xs={8} key={post}>{post}</Grid>;
        })}

    </Grid>
  );
}

export default PostContainer;
