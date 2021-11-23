import React from "react";
import Footer from "../generic/footer/Footer";
import Header from "../generic/header/Header";
import MainBackground from "../generic/mainBackground/MainBackground";
import PostContainer from "../post/postContainer/PostContainer";

function PostsPage() {
  return (
    <div>
      <Header />
      <MainBackground />

      <PostContainer />
      <Footer />
    </div>
  );
}

export default PostsPage;
