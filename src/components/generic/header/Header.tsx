import { Search } from "@mui/icons-material";
import { join } from "path";
import React, { useState, useEffect, useRef  } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {Account} from "../../../App"
import "./style.css";

// FIXME: @jimmy, please convert all the js code (ones with the "!") into ts

type HeaderProps = {
  account ?: Account | null,
  setAccount?: (account: Account) => void

}

function Header({account, setAccount} : HeaderProps) {

  const navigate = useNavigate();
  // open navigation bar
  const [isNavActive, setIsNavActive] = useState(false);

  // state for open the search text
  const [isSearched, setIsSearched] = useState(false);

  var join_logout = useRef<HTMLAnchorElement | null>(null)
  var nav_list = useRef<HTMLUListElement | null>(null)
  var engineering = useRef<HTMLAnchorElement | null>(null)
  var computer = useRef<HTMLAnchorElement | null>(null);
  var scd = useRef<HTMLAnchorElement | null>(null)
  var searchText = useRef<HTMLInputElement |null>(null)

  const searchedClick = () => {
    setIsSearched(!isSearched);
    console.log(isSearched);

    if (isSearched === true) {
      searchText.current!.style.display! = "block";
      nav_list.current!.classList.add(".nav-list-search");
      engineering.current!.style.display = "none";
      computer.current!.style.display = "none";
      scd.current!.style.display = "none";
      join_logout.current!.style.display = "none";
    } else {
      searchText.current!.style.display! = "none";
      nav_list.current!.style.display = "flex";
      nav_list.current!.classList.remove(".nav-list-search");
      engineering.current!.style.display = "block";
      computer.current!.style.display = "block";
      scd.current!.style.display = "block";
      join_logout.current!.style.display = "block";
    }
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

  const joinUser = () => {

    if(account === null){
      navigate('/login')
    } else{

      var accountObject = {
        gmail: "email.current.value",
        password: "password.current.value"
      }

      //TODO: set the account to null
      join_logout!.current!.innerHTML = "JOIN"

      // to check if the null value is used for the setAccount
      if(setAccount){
        setAccount(accountObject)
      }
    }
  }

  // This useEffect is used for setting up the textInput
  useEffect(() => {
    console.log("Hello");

    if(account === null){
      join_logout!.current!.innerHTML = "JOIN"
    } else{
      join_logout!.current!.innerHTML = "Sign out"

    }

  }, []);

  return (
    <header>
      <div className="container">
        <div className="nav-container" >
          <Link to="/">          
            <a id="logo-text" className="logo">
              Showcase
            </a>
          </Link>

          {/* The list of category */}
          <ul className="nav-list" ref={nav_list}>
            <li>
              <a id="engineering" className="nav-link major" ref={engineering}>
                Engineering
              </a>
            </li>
            <li>
              <a
                id="computer"
                href="../ServiceCategoryPage/serviceCategoryPage.html"
                className="nav-link major"
                ref={computer}
              >
                Computer Science
              </a>
            </li>
            <li>
              <a id="scd" className="nav-link major" ref={scd}>
                Design
              </a>
            </li>

            {/* <li>
              <a id="signin-profile" className="nav-link">
                Sign In
              </a>
            </li> */}

            <a onClick={joinUser} id="join-logout" ref={join_logout}>
              Join
            </a>

            <input ref={searchText} type="text" placeholder="Search…" id="searchText" />

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
