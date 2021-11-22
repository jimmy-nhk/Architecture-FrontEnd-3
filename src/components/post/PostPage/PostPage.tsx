import { Container } from "@mui/material";
import React from "react";
import DefaultLayout from "../../generic/layout/DefaultLayout";
import BodySection from "./BodySection";
import HeaderSection from "./HeaderSection";
import HeroSection from "./HeroSection";

const PostPage = () => {
  return (
    <DefaultLayout>
      <>
      <HeroSection />
      <Container maxWidth="lg" sx={{ margin: "100px auto" }}>
        <HeaderSection />
        <BodySection />
      </Container>
      </>
  </DefaultLayout>
  );
}

export default PostPage;
