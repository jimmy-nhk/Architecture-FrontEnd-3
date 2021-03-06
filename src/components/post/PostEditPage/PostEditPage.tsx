import { Box, Button, Container, Grid, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppConstants } from '../../../app/common/app.constants';

import { TokenStorageService } from '../../../app/service/token-storage.service';
import DefaultLayout from '../../generic/layout/DefaultLayout';
import AddContributorCard from '../PostCreatePage/cards/AddContributorCard';
import MetadataCard from '../PostCreatePage/cards/MetadataCard';
import TitleAndContentCard from '../PostCreatePage/cards/TitleAndContentCard';
import UploadImageCard from '../PostCreatePage/cards/UploadImageCard';

const CATEGORIES = [
    "Engineering",
    "Computer Science",
    "Design",
    "Business",
    "Professional Communication",
  ];

export type IPost = {
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
const PostEditPage = () => {

  var postId = useParams();
  var { id } = postId;
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
  const [postContributors, setPostContributors] = useState<Contributor[]>([]);
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

  var post: IPost | undefined = undefined;

  var getPostUrl =  AppConstants.POST_URL + `getPost/id=${id}`
  useEffect(() => {
    console.log("postID: " , id)
    // console.log("isLikedByUser=", isLikedByUser)
    axios.get(getPostUrl).then((response: AxiosResponse) => {

    // axios.get(URL + id).then((response: AxiosResponse) =>

      post = response.data as IPost;
      setPostTitle(post.title);
      setPostTagline(post.tagline);
      console.log("post.bodyText: " , post.bodyText)
      setPostContent(post.bodyText);
      setPostCategory(post.category);
      

      var arrDirectors = post.directors.split(';');
      arrDirectors.map((x, index) => {

        postContributors.push({
          id:index,
          name:x.trim()
        });
        setPostContributors(postContributors);

      });
      setPostCoverUrl(post.coverUrl);
      setPostCategory(post.category);
      setPostTags(post.tags.split(';'));

    });
  }, [])

  

  console.log("PostCreatePage coverUrl=", postCoverUrl);
  
  var updatePostUrl = AppConstants.POST_URL + "updatePost"
  const editPostAsync = () => {
    const postObject = {
      id: id,
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
      .put(updatePostUrl, postObject)
      .then((response: AxiosResponse) => {
        console.log("Successfully updated to the server");
        console.log(response.data)
        // Finish the web here
        navigate('/user')

      })
      .catch((err) => {
        console.log(err.response);
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
            Edit post {}
          </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={editPostAsync}
            >
              Edit
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
export default PostEditPage;
