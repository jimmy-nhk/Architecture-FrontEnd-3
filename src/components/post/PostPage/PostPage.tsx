import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../../generic/layout/DefaultLayout";
import BodySection from "./BodySection";
import HeaderSection from "./HeaderSection";
import HeroSection from "./HeroSection";
import axios, {AxiosResponse} from "axios";

interface IPost {
  pid: number;
  title: string,
  bodyText: string,
  category: string,
  directors: string,
  coverUrl: string,
  likedCount: number,
  viewCount: number,
  tags: string
}

const URL = "https://sead-back-postservice.herokuapp.com/";
const postId = 17;
const PostPage = () => {
  var post: IPost | undefined = undefined;
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [postCategory, setPostCategory] = useState('')
  const [postContributors, setPostContributors] = useState('')
  const [postCoverUrl, setPostCoverUrl] = useState('')
  const [postLikedCount, setPostLikedCount] = useState(0)
  const [postViewCount, setPostViewCount] = useState(0)
  const [postTags, setPostTags] = useState('')

  useEffect(() => {
    axios.get(URL + "posts")
    .then((response: AxiosResponse) => {
        // console.log('response.data=', response.data);
        post = response.data[postId] as IPost
        // console.log('fetch post=', post)
        setPostTitle(post.title)
        setPostBody(post.bodyText)
        setPostCategory(post.category)
        setPostContributors(post.directors)
        setPostCoverUrl(post.coverUrl)
        setPostLikedCount(post.likedCount)
        setPostViewCount(post.viewCount)
        setPostTags(post.tags)
    });
  }, [])  

  return (
    <DefaultLayout>
      <>
      <HeroSection title={postTitle} />
      <Container maxWidth="lg" sx={{ margin: "100px auto" }}>
        <HeaderSection />
        <BodySection 
        bodyText={postBody}
         />
      </Container>
      </>
  </DefaultLayout>
  );
}

export default PostPage;
