import { Box, Button, Container, Grid, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AppConstants } from '../../../app/common/app.constants';
import { TokenStorageService } from '../../../app/service/token-storage.service';
import DefaultLayout from '../../generic/layout/DefaultLayout';
import AddContributorCard from './cards/AddContributorCard';
import MetadataCard from './cards/MetadataCard';
import TitleAndContentCard from './cards/TitleAndContentCard';
import UploadImageCard from './cards/UploadImageCard';

const CATEGORIES = [
    "Engineering",
    "Computer Science",
    "Design",
    "Business",
    "Professional Communication",
  ];

export type Post = {
  userId: number,
  title: string,
  tagline: string,
  bodyText: string,
  category:  string,
  directors:  string,
  coverUrl:  string,
  likedCount: number,
  viewCount: number,
  tags:  string,
}

export interface Contributor {
  id: number;
  name: string;
}

//API REQUESTS PARAMS
const URL = "https://sead-back-postservice.herokuapp.com/";
const postPath = "post";
const PostCreatePage = () => {
  // Declare hook of title and content card params
  // Post title
  const [postTitle, setPostTitle] = useState<string>("");
  const updatePostTitle = (title: string): void => {
    setPostTitle(title);
  };
  // Post tagline
  const [postTagline, setPostTagline] = useState<string>("");
  const updatePostTagline = (tagline: string): void => {
    setPostTagline(tagline);
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
  // Post tags
  const [postTags, setPostTags] = useState<string[]>([]);
  const updatePostTags = (tags: string[]): void => {
    setPostTags(tags);
  };
  // Post directors
  const [postContributors, setPostContributors] = useState<Contributor[]>([
    {
      id: 0,
      name: "",
    },
    {
      id: 1,
      name: "",
    },
  ]);
  const updatePostContributors = (contributorList: Contributor[]): void => {
    const arrayMap = contributorList.map((c) => ({
      id: c.id,
      name: c.name,
    }));
    setPostContributors(arrayMap);
  };

  // Post thumbnail url
  const [postCoverUrl, setPostCoverUrl] = useState<string>("");
  const updatePostCoverUrl = (coverUrl: string): void => {
    setPostCoverUrl(coverUrl);
  };

  // Category Id for redirect
  const [postCategoryId, setPostCategoryId] = useState(1)

  //useEffect
  useEffect(() => {
    // console.log("postCreatePage:");
    // console.log("postContributor update: ", postContributors);
    // console.log("postCategory update: ", postCategory);
    // console.log("postTags update: ", postTags);
    // console.log("postCover update: ", postCoverUrl);
    setPostCategoryId(CATEGORIES.indexOf(postCategory))
  }, [
    postCategory,
  ]);

  const navigate = useNavigate()

  console.log("PostCreatePage coverUrl=", postCoverUrl);
  const addPostAsync = () => {
    const postObject = {
      userId: new TokenStorageService().getUser().id,
      title: postTitle.trim(),
      tagline: postTagline.trim(),
      bodyText: postContent.trim(),
      category: postCategory,
      directors: postContributors.map((c) => c.name.trim()).join("; "),
      coverUrl: postCoverUrl,
      likedCount: 0,
      viewCount: 0,
      tags: postTags.join("; "),
    };
    // const postURL = "http://localhost:5000/post/";
    const postURL = URL + postPath;
    const getURL = URL + "posts";
    // console.log("Posting post to the server");
    // console.log(postObject);
    // console.log(postURL);

    // axios.post(postURL, postObject,
    console.log(postObject)
    axios
      // .post("http://localhost:8085/crud/createPost", postObject)
      .post(AppConstants.POST_URL_KAFKA, postObject)
      .then((response: AxiosResponse) => {
        console.log("Successfully posted to the server");
        console.log(response.data)
        // Finish the web here
        navigate(`/user`)
        
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err);
      });
  };
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
              onClick={() => addPostAsync()}
            >
              Create
            </Button>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <TitleAndContentCard
              title={postTitle}
              updatePostTitle={updatePostTitle}
              content={postContent}
              updatePostContent={updatePostContent}
              tagline={postTagline}
              updatePostTagline={updatePostTagline}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <UploadImageCard
              coverUrl={postCoverUrl}
              updateCoverUrl={updatePostCoverUrl}
            />
            <AddContributorCard
              contributors={postContributors}
              updatePostContributors={updatePostContributors}
            />
            <MetadataCard
              category={postCategory}
              updatePostCategory={updatePostCategory}
              tags={postTags}
              updatePostTags={updatePostTags}
            />
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
};
export default PostCreatePage;
