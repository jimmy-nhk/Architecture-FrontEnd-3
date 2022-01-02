import React, { useEffect, useState } from "react";
import Post from "../postCard/Post";
import "./style.css";
import Grid from "@mui/material/Grid";
import {Link} from 'react-router-dom';
import { Box } from "@mui/material";

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
    <div>
      <Grid container 
      rowSpacing={4} 
      columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
      className="posts">
          {posts.map((post, index) => ( 
            <Grid item xs={12} md={6}>
              <Link className = "post-item" to='/post' style={{textDecoration:'none'}}>
                {post}
              </Link>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default PostContainer;
