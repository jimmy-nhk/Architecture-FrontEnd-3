import React from "react";
import { useParams } from "react-router";
import Footer from "../generic/footer/Footer";
import Header from "../generic/header/Header";
import MainBackground from "../generic/mainBackground/MainBackground";
import PostContainer from "../post/postContainer/PostContainer";

function PostsPage() {
  const {category} = useParams();

  return (
    <div>
      <Header />
      <MainBackground category={category} />

      <PostContainer category={category} />
      <Footer />
    </div>
  );
}

export default PostsPage;
