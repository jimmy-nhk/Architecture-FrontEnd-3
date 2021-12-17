import React, { Dispatch, FunctionComponent } from "react";

import "./style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { Account } from "../../../App";
import { AppConstants } from "../../../app/common/app.constants";
import { TokenStorageService } from "../../../app/service/token-storage.service";
import { useLocation } from "react-router";

// import { Account } from "../../../App"; 
// style for modal
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// interface setAccountFunction {
//   setAccount : React.Dispatch<React.SetStateAction<Account>>;
// }

type AccountProp = {
  setAccount: (account: Account) => void
}


function LoginPage( {setAccount} : AccountProp) {
  var url = 'http://localhost:8080/'
  var database = `accounts/`

  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  var isLoggedIn = false;
  var isLoginFailed = false;
  var currentUser: any;

  let tokenStorage = new TokenStorageService()

  let search = useLocation().search;
  useEffect(()=>{
    const token = new URLSearchParams(search).get("token")
    const error = new URLSearchParams(search).get("error")

    // If user token was already stored => navigate to main page
    if (tokenStorage.getToken()){
      console.log("User found, should redirect to main page")
      isLoggedIn = true
      axios.interceptors.request.use(request =>{
        if (tokenStorage.getToken()){
          // request.headers.common.Authorization = `Bearer ${tokenStorage.getToken()}`
          if (request.headers){
            request.headers['Authorization'] = `Bearer ${tokenStorage.getToken()}`
          }
        }
        return request
      })
      currentUser = tokenStorage.getUser()
      // Navigate to main page here
      navigate('/')

    // If user is not found, but there is token, store token and login
    } else if (token){
      console.log("User not found, but found token, should redirect to main page")
      tokenStorage.saveToken(token);

      axios.interceptors.request.use(request =>{
        if (tokenStorage.getToken()){
          // request.headers.common.Authorization = `Bearer ${tokenStorage.getToken()}`
          if (request.headers){
            request.headers['Authorization'] = `Bearer ${tokenStorage.getToken()}`
          }
        }
        return request
      })


      // navigate('/')
      axios.get(AppConstants.API_URL+'user/me',{
        headers:{
            'Content-Type':'application/json'
        }
      }).then(data =>{
          console.log("user/me", data)
          login(data)
      }, err=>{
          console.log("Log in failed")
          console.log(err)
          isLoggedIn = false
      })
    } else{
      console.log("User not found, login page operate as normal")
    }

    console.log("Token: ", token)
    console.log("Error: ", error)
    
  }, []);

  const login = (user:any)=>{
    console.log("At login function")
    tokenStorage.saveUser(user)
    isLoggedIn = true
    currentUser = tokenStorage.getUser();
    // Navigate to main page here
    navigate('/')
  }

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const passwordError = useRef<HTMLParagraphElement>(null);
  const emailError = useRef<HTMLParagraphElement>(null);

  const loginError = useRef<HTMLSpanElement>(null);

  const validateLoginForm = () => {
    // setOpen(true);
    console.log(email.current?.value);
    console.log("Direct to main");
    console.log(password.current?.value);

    var emailCurrentValue = email.current?.value;
    var passwordCurrentValue = password.current?.value;
    var passwordElement = document.querySelector("#password");

    if (
      null !== email.current &&
      null !== emailError.current &&
      null !== password.current &&
      null !== passwordError.current
    ) {
      if (emailCurrentValue?.length === 0) {
        displayError(email.current, emailError.current, "Email must be filled");
        return;
      } else {
        hideError(email.current!, emailError.current!);
      }

      if (passwordCurrentValue?.length === 0) {
        console.log(passwordCurrentValue?.length + " length");

        // validate the null value

        console.log(passwordCurrentValue?.length + " length");

        displayError(
          password.current,
          passwordError.current,
          "Password must be filled"
        );
        return;
      } else {
        hideError(password.current!, passwordError.current!);
      }

      var accountObject = {
        gmail: email.current.value,
        password: password.current.value
      }

      axios.post(AppConstants.AUTH_API+'signin', {
        email: accountObject.gmail,
        password: accountObject.password
      },{
          headers:{
              'Content-Type':'application/json'
          }
      }).then(res=>{
          console.log("Logged in")
          console.log(res)
          tokenStorage.saveToken(res.data.accessToken)
          login(res.data.user)
      }, err=>{
        console.log("Log in failed")
        console.log(err)
        isLoggedIn = false
      })

      // fetch the data from the backend to check the result
      // axios.post(url + database + `login`, accountObject)
      //   .then(res => {
      //     console.log(res.data)

      //     if(res.data === true){

      //       setAccount(accountObject);
      //       navigate('/')
      //     } else {
            
            
      //       loginError.current!.style.borderColor = "#c92432";
      //       loginError.current!.style.borderWidth = "2px";
      //       loginError.current!.style.outline = "none";
      //       loginError.current!.style.color = "red";
      //       loginError.current!.innerHTML = ("The account cannot be found or the password is incorrect.\nPlease try again!")
            
      //     }
      //   })

    }


    // navigate("/", { replace: true });
  };

    // hide the error if validate the result
    const hideError = (field: HTMLElement, text: HTMLElement) => {
      text.innerHTML = ""
      field.style.borderColor = "#c4c4c4";
      field.style.borderWidth = "1px";
    };


  // display error upon invalid inputs
  const displayError = (
    field: HTMLElement,
    text: HTMLElement,
    message: string
  ) => {
    field.style.borderColor = "#c92432";
    field.style.borderWidth = "2px";
    field.style.outline = "none";
    text.innerHTML = message;
    field.focus();
  };

  // validate the toggle password
  const togglePasswordVisibility = () => {
    if (password.current?.type === "password") {
      password.current.type = "text";
    } else if (password.current?.type === "text") {
      password.current.type = "password";
    }
  };

  const checkStorage = () =>{
    let tokenStorage = new TokenStorageService()
    console.log(tokenStorage.getToken())
  }
  checkStorage()

  return (
    <div>
      <div className="split-screen">
        <div className="left">
          <section className="logo-container">
            <div id="logo-text">Showcase</div>{" "}
          </section>
          <section className="copy">
            <h1>Explore different projects</h1>
            <p>Over 100+ projects delivered from numerous majors</p>
          </section>
        </div>
        <div className="right">
          <form
            id="login-form"
            onSubmit={(event) => {
              event.preventDefault();
              return false;
            }}
          >
            <section className="copy">
              <h2>Login To Your Account</h2>
            </section>
            <div className="input-container email">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" maxLength={40} ref={email} />
            </div>
            <p ref={emailError} id="email-error" className="error-text"></p>
            <div className="input-container password">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                ref={password}
                placeholder="Must be at least 6 characters"
                maxLength={128}
              />
              {/* <i
                id="visibility-icon"
                //   onClick="togglePasswordVisibility()"
                className="far fa-eye-slash"
              ></i> */}
            </div>

            <p
              ref={passwordError}
              id="password-error"
              className="error-text"
            ></p>
            <span>
              <input
                type="checkbox"
                id="passwordVisibility"
                onClick={togglePasswordVisibility}
              />
              <span style={{ marginLeft: "10px" }}>Show Password</span>
            </span>
            <br/>
            <span id="showLoginError" ref={loginError}>
            </span>
            {/* <div className="input-container cta">
              <label className="checkbox-container">
                <input id="remember-me" type="checkbox" value="isRememberMe" />
                <span className="checkmark"></span>
                Remember me
              </label>
            </div> */}
            <button
              onClick={validateLoginForm}
              className="signup-btn"
              type="submit"
            >
              Login
            </button>
            <section className="copy legal">
              <p>
                <span className="small">
                  Don't have an account yet?
                  <a href="/signup"> Register here</a>
                </span>
              </p>
            </section>
            <a className="google-btn" href={AppConstants.GOOGLE_AUTH_URL}>
              Sign in with Google
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
