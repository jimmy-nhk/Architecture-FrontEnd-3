import { Container } from "@mui/material";
import React from "react";
import Comments from "../../comment/Comments";
import DefaultLayout from "../../generic/layout/DefaultLayout";
import BodySection from "./BodySection";
import HeaderSection from "./HeaderSection";
import HeroSection from "./HeroSection";

const PostPage = () => {
  return (
    <DefaultLayout style={{backgroundColor: "white"}}>
      <>
      <HeroSection />
      <Container maxWidth="lg" sx={{ margin: "100px auto" }}>
        <HeaderSection />
        <BodySection />
        <Comments currentUserId={1} postId={1}/>
      </Container>
      </>
  </DefaultLayout>
  );
}

export default PostPage;
