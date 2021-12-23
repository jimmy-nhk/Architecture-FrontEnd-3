import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import DefaultLayout from "../../generic/layout/DefaultLayout";
import AddContributorCard from "./cards/AddContributorCard";
import MetadataCard from "./cards/MetadataCard";
import TitleAndContentCard from "./cards/TitleAndContentCard";
import UploadImageCard from "./cards/UploadImageCard";

const PostCreatePage = () => {
  // Declare hook of title and content card params
  //title
  const [postTitle, setPostTitle] = useState<string>("")
  const updatePostTitle = (title: string): void => {
    setPostTitle(title)
  }
  //title
  const [postContent, setPostContent] = useState<string>("")
  const updatePostContent = (content: string): void => {
    setPostContent(content)
  }

  interface IPostData {
    id?: any | null,
    title: string,
    description: string,
    published?: boolean,
  }

  const handleCreatePost = () => {
    
  }

  //useEffect
  useEffect(() => {
    console.log("postCreatePage:")
    console.log("postTitle update: " + postTitle);
    console.log("postContent update: ", postContent);
  
  }, [postTitle, postContent])

  return (
    <DefaultLayout style={{ backgroundColor: "#f3f3f4" }}>
      <Container maxWidth="lg" sx={{ padding: "6.5rem 0", margin: "0 auto" }}>
        <Box sx={{ display: "flex", paddingTop: "50px", paddingBottom: "20px" }}>
          <Typography variant="h4" sx={{ flexGrow: 1, alignSelf: "flex-end" }}>
            Create a post
          </Typography>
          <Button variant="contained" size="large" onClick={() => handleCreatePost}>
            Create
          </Button>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <TitleAndContentCard
              title={postTitle}
              updatePostTitle={updatePostTitle}
              content={postContent}
              updatePostContent={updatePostContent} />
          </Grid>
          <Grid item xs={12} md={4} >
            <UploadImageCard />
            <AddContributorCard />
            <MetadataCard />
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
}

export default PostCreatePage;
