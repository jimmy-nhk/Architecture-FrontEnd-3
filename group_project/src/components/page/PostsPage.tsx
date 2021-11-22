import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MainBackground from "../mainBackground/MainBackground";
import PostContainer from "../postContainer/PostContainer";

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
