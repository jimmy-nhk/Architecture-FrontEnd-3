import { Container } from "@mui/material";
import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";

type Props = {
  children: React.ReactElement
}

const PostLayout = ({
  children
}: Props) => {
  return (
    <>
      <Header />
        <div>
          { children }
        </div>
      <Footer />
    </>
  );
}

export default PostLayout;
