import React from "react";
import CategoryContainer from "../categoryContainer/CategoryContainer";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MainBackground from "../mainBackground/MainBackground";
import CategoryPost from "../postCategory/CategoryPost";

function MainPage() {
  return (
    <div>
      <Header />
      <MainBackground />

    <CategoryPost />
<CategoryContainer />
      <Footer />
    </div>
  );
}

export default MainPage;
