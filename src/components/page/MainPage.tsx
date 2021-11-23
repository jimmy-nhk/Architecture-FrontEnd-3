import React from "react";
import CategoryContainer from "../post/categoryContainer/CategoryContainer";
import Footer from "../generic/footer/Footer";
import Header from "../generic/header/Header";
import MainBackground from "../generic/mainBackground/MainBackground";
import CategoryPost from "../post/postCategory/CategoryPost";

function MainPage() {
  return (
    <div>
      <Header />
      <MainBackground />

      <CategoryContainer />
      <Footer />
    </div>
  );
}

export default MainPage;
