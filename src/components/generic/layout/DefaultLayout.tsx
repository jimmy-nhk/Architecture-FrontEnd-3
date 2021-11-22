import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";

type Props = {
  children: React.ReactElement,
  style?: any
}

const DefaultLayout = ({
  children, 
  style
}: Props) => {
  return (
    <>
      <Header />
        <div style={style}>
          { children }
        </div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
