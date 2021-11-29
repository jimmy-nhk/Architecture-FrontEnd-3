import React, { useEffect, useState } from "react";
import Post from "../postCard/Post";
import "./style.css";
import Grid from "@mui/material/Grid";
import {Link} from 'react-router-dom';

function PostContainer() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const children = [];
    let i;
    for (i = 0; i < 10; i++) {
      children.push(<Post key={i} />);
    }

    setPosts(children);

    console.log(posts);
  }, []);

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="post-container">
        {posts.map((post, index) => ( 
          <Link className = "post-item" to='/post' style={{textDecoration:'none'}}>
            <Grid item xs={8} key={index}>{post}</Grid>
          </Link>
        ))}

    </Grid>
  );
}

export default PostContainer;
