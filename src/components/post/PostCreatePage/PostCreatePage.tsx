import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import DefaultLayout from "../../generic/layout/DefaultLayout";
import AddContributorCard from "./cards/AddContributorCard";
import MetadataCard from "./cards/MetadataCard";
import TitleAndContentCard from "./cards/TitleAndContentCard";
import UploadImageCard from "./cards/UploadImageCard";

export interface Contributor {
  id: number;
  name: string;
}

const PostCreatePage = () => {
  // Declare hook of title and content card params
  // Post title
  const [postTitle, setPostTitle] = useState<string>("");
  const updatePostTitle = (title: string): void => {
    setPostTitle(title);
  };
  // Post content
  const [postContent, setPostContent] = useState<string>("");
  const updatePostContent = (content: string): void => {
    setPostContent(content);
  };
  // Post category
  const [postCategory, setPostCategory] = useState<string>("");
  const updatePostCategory = (category: string): void => {
    setPostCategory(category);
  };
  // Post directors
  const [postContributors, setPostContributors] = useState<Contributor[]>([{
    id: 0,
    name: ''
  }, {
    id: 1,
    name: ''
  }]);
  const updatePostContributors = (contributorList: Contributor[]): void => {
    const arrayMap = contributorList.map((c) => ({
      id: c.id,
      name: c.name
    }))
    setPostContributors(arrayMap)
  };

  // Post thumbnail url
  const [postCoverUrl, setPostCoverUrl] = useState<string>("");
  const updatePostCoverUrl = (coverUrl: string): void => {
    setPostCoverUrl(coverUrl);
  };

  interface IPostData {
    id?: any | null;
    title: string;
    description: string;
    published?: boolean;
  }

  const handleCreatePost = () => {};

  //useEffect
  useEffect(() => {
    // console.log("postCreatePage:");
    // console.log("postContributors update: ", postContributors);
  }, [postTitle, postContent, postContributors]);

  return (
    <DefaultLayout style={{ backgroundColor: "#f3f3f4" }}>
      <Container maxWidth="lg" sx={{ padding: "6.5rem 0", margin: "0 auto" }}>
        <Box
          sx={{ display: "flex", paddingTop: "50px", paddingBottom: "20px" }}
        >
          <Typography variant="h4" sx={{ flexGrow: 1, alignSelf: "flex-end" }}>
            Create a post
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => handleCreatePost}>
            Create
          </Button>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <TitleAndContentCard
              title={postTitle}
              updatePostTitle={updatePostTitle}
              content={postContent}
              updatePostContent={updatePostContent}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <UploadImageCard
              coverUrl={postCoverUrl}
              updateCoverUrl={updatePostCoverUrl}/>
            <AddContributorCard
              contributors={postContributors}
              updatePostContributors={updatePostContributors}/>
            <MetadataCard />
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

export default PostCreatePage;
