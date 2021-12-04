import { Search } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./style.css";

// FIXME: @jimmy, please convert all the js code (ones with the "!") into ts

function Header() {
  // open navigation bar
  const [isNavActive, setIsNavActive] = useState(false);

  // state for open the search text
  const [isSearched, setIsSearched] = useState(false);

  const searchedClick = () => {
    setIsSearched(!isSearched);
    console.log(isSearched);
    const searchedText = document.querySelector("#searchText");

    // if (isSearched === true) {
    //   searchedText!.style!.display! = "block";
    //   document!.querySelector(".nav-list")!.classList.add(".nav-list-search");
    //   document!.querySelector("#sbm")!.style.display = "none";
    //   document!.querySelector("#sst")!.style.display = "none";
    //   document!.querySelector("#scd")!.style.display = "none";
    //   document!.querySelector("#join-logout")!.style!.display = "none";
    //   document!.querySelector("#signin-profile")!.style!.display = "none";
    // } else {
    //   searchedText!.style.display = "none";
    //   document!.querySelector(".nav-list")!.classList.remove(".nav-list-search");

    //   document!.querySelector(".nav-list")!.style!.display = "flex";
    //   document!.querySelector("#sbm")!.style!.display = "block";
    //   document!.querySelector("#sst")!.style!.display = "block";
    //   document!.querySelector("#scd")!.style!.display = "block";
    //   document!.querySelector("#join-logout")!.style!.display = "block";
    //   document!.querySelector("#signin-profile")!.style!.display = "block";
    // }
  };

  const burgerClicked = () => {
    const nav = document.querySelector(".nav-list");
    const burger = document.querySelector(".burger");

    // Toggle navigation bar

    if (isNavActive === false) {
      nav!.classList.add("nav-active");
      nav!.classList.remove("nav-inactive");
      // isNavActive = true;
      setIsNavActive(true);
    } else {
      nav!.classList.add("nav-inactive");
      nav!.classList.remove("nav-active");

      setTimeout(function () {
        nav!.classList.remove("nav-inactive");
      }, 600);

      // isNavActive = false;
      setIsNavActive(false);
    }

    // Burger animation
    burger!.classList.toggle("toggle");

    console.log(isNavActive);
  };

  // This useEffect is used for setting up the textInput
  useEffect(() => {
    console.log("Hello");


  }, []);

  return (
    <header>
      <div className="container">
        <div className="nav-container">
          <Link to="/">          
            <a id="logo-text" className="logo">
              Showcase
            </a>
          </Link>

          {/* The list of category */}
          <ul className="nav-list">
            <li>
              <a id="sst" className="nav-link major">
                Engineering
              </a>
            </li>
            <li>
              <a
                id="sbm"
                href="../ServiceCategoryPage/serviceCategoryPage.html"
                className="nav-link major"
              >
                Computer Science
              </a>
            </li>
            <li>
              <a id="scd" className="nav-link major">
                Design
              </a>
            </li>

            <li>
              <a id="signin-profile" className="nav-link">
                Sign In
              </a>
            </li>

            <a href="/login" id="join-logout">
              Join
            </a>

            <input type="text" placeholder="Search…" id="searchText" />

            <Search id="searchIcon" onClick={searchedClick} />
          </ul>

          <div className="burger" onClick={burgerClicked}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
