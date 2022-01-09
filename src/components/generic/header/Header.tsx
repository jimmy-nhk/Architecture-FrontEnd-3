import { Logout, Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { join } from "path";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Account } from "../../../App";
import { TokenStorageService } from "../../../app/service/token-storage.service";
import "./style.css";

// FIXME: @jimmy, please convert all the js code (ones with the "!") into ts

type HeaderProps = {
  account?: Account | null;
  setAccount?: (account: Account) => void;
};

function Header({ account, setAccount }: HeaderProps) {
  const navigate = useNavigate();
  // open navigation bar
  const [isNavActive, setIsNavActive] = useState(false);

  // state for open the search text
  const [isSearched, setIsSearched] = useState(false);

  var create_post = useRef<HTMLAnchorElement | null>(null);
  var join_logout = useRef<HTMLAnchorElement | null>(null);
  var nav_list = useRef<HTMLUListElement | null>(null);
  var engineering = useRef<HTMLAnchorElement | null>(null);
  var business = useRef<HTMLAnchorElement | null>(null);
  var scd = useRef<HTMLAnchorElement | null>(null);
  var searchText = useRef<HTMLInputElement | null>(null);

  var tokenStorage = new TokenStorageService();

  const searchedClick = () => {
    console.log("Before: " + isSearched);

    setIsSearched(isSearched ? false : true);
  };

  useEffect(() => {
    console.log("After: " + isSearched);
    if (isSearched === true) {
      searchText.current!.style.display! = "block";
      nav_list.current!.classList.add(".nav-list-search");
      engineering.current!.style.display = "none";
      business.current!.style.display = "none";
      scd.current!.style.display = "none";
      join_logout.current!.style.display = "none";
    } else {
      searchText.current!.style.display! = "none";
      nav_list.current!.style.display = "flex";
      nav_list.current!.classList.remove(".nav-list-search");
      engineering.current!.style.display = "block";
      business.current!.style.display = "block";
      scd.current!.style.display = "block";
      join_logout.current!.style.display = "block";
    }
  }, [isSearched]);

  const burgerClicked = () => {
    const nav = document.querySelector(".nav-list");
    const burger = document.querySelector(".burger");

    // Toggle navigation bar

    if (isNavActive === false) {
      nav!.classList.add("nav-active");
      nav!.classList.remove("nav-inactive");
      searchText.current!.style.display! = "block";
      // isNavActive = true;
      setIsNavActive(true);
    } else {
      searchText.current!.style.display! = "none";

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
    // if(account === null){
    //   navigate('/login')
    // } else{

    //   var accountObject = {
    //     gmail: "email.current.value",
    //     password: "password.current.value"
    //   }

    //   //TODO: set the account to null
    //   join_logout!.current!.innerHTML = "JOIN"

    //   // to check if the null value is used for the setAccount
    //   if(setAccount){
    //     setAccount(accountObject)
    //   }
    // }

    if (tokenStorage.getToken()) {
      logout();
    } else {
      navigate("/login");
    }
  };

  let logout = () => {
    tokenStorage.signOut();
    window.location.reload();
  };

  // This useEffect is used for setting up the textInput
  useEffect(() => {
    console.log("Check if user is logged in...");

    if (tokenStorage.getToken()) {
      console.log("User is logged in");
      console.log("User info:", tokenStorage.getUser());
      join_logout!.current!.innerHTML = "Sign out";
    } else {
      console.log("User is not logged in");
      join_logout!.current!.innerHTML = "JOIN";
    }

    // if(account === null){
    //   join_logout!.current!.innerHTML = "JOIN"
    // } else{
    //   join_logout!.current!.innerHTML = "Sign out"

    // }
  }, []);

  const goToPosts = (category: string | undefined) => {
    navigate("/posts/" + category);
  };

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
          <ul className="nav-list" ref={nav_list}>
            <li>
              <Link
                to={`/posts/Engineering`}
                id="engineering"
                className="nav-link major"
                ref={engineering}
                //  onClick={() => goToPosts(engineering.current?.innerText)}
              >
                Engineering
              </Link>
            </li>
            <li>
              <Link
                to={`/posts/Business`}
                id="business"
                className="nav-link major"
                ref={business}
                // onClick={() => goToPosts(business.current?.innerText)}
              >
                Business
              </Link>
            </li>
            <li>
              <Link
                to={`/posts/Design`}
                id="scd"
                className="nav-link major"
                ref={scd}
                // onClick={() => goToPosts(scd.current?.innerText)}
              >
                Design
              </Link>
            </li>

            <li>
              <Link
                to={`/posts/Professional Communication`}
                id="scd"
                className="nav-link major"
                ref={scd}
                // onClick={() => goToPosts(scd.current?.innerText)}
              >
                Professional Communication
              </Link>
            </li>

            {/* <li>
              <a id="signin-profile" className="nav-link">
                Sign In
              </a>
            </li> */}
            {tokenStorage.getToken() && (
              <Link to="/postCreate">
                <a id="join-logout" ref={create_post}>
                  Create
                </a>
              </Link>
            )}

            <a onClick={joinUser} id="join-logout" ref={join_logout}>
              Join
            </a>
            {new TokenStorageService().getUser().id ? 
            <Link
                  to={`/user`}
                  style={{ textDecoration: "none" }}
                >
              <Avatar
                src={
                  "https://firebasestorage.googleapis.com/v0/b/sead-c470a.appspot.com/o/icons%2F270046958_615379902860003_6138128603524470268_n.png?alt=media&token=209cab2f-d198-42e3-8c41-dd1e93deef0b"
                }
              />
              </Link> :
              null
            }

            <input
              ref={searchText}
              type="text"
              placeholder="Search…"
              id="searchText"
            />

            <Search
              id="searchIcon"
              style={{ display: "block" }}
              onClick={searchedClick}
            />
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
