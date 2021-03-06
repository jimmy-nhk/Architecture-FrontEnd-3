import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppConstants } from "../../../app/common/app.constants";
import { AuthService } from "../../../app/service/auth.service";
import { TokenStorageService } from "../../../app/service/token-storage.service";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function SignupPage() {
  var url = "http://localhost:8080/";
  var database = `accounts/`;

  let tokenStorage = new TokenStorageService()
  let authService = new AuthService()

  useEffect(() => {
    if (tokenStorage.getToken()){
      console.log("User found, should redirect to main page")
      // Navigate to main page here
      navigate('/')
    }
  }, [])


  const fnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  // const repeatPasswordRef = useRef<HTMLInputElement>(null);

  const fnameErrorRef = useRef<HTMLParagraphElement>(null);
  const emailErrorRef = useRef<HTMLParagraphElement>(null);
  const passwordErrorRef = useRef<HTMLParagraphElement>(null);
  // const repeatPasswordErrorRef = useRef<HTMLParagraphElement>(null);

  const signUpErrorRef = useRef<HTMLSpanElement>(null);

  let navigate = useNavigate();

  const validateSignupForm = () => {
    var emailCurrentValue = emailRef.current!.value;
    var passwordCurrentValue = passwordRef.current!.value;
    var fnameCurrentValue = fnameRef.current!.value;
    // var repeatPasswordValue = repeatPasswordRef.current!.value;

    if (fnameCurrentValue.length === 0) {
      displayError(
        fnameRef.current!,
        fnameErrorRef.current!,
        "Full name must be filled"
      );
      return;
    } else {
      hideError(fnameRef.current!, fnameErrorRef.current!);
    }

    if (emailCurrentValue.length === 0) {
      displayError(
        emailRef.current!,
        emailErrorRef.current!,
        "Email must be filled"
      );
      return;
    } else {
      hideError(emailRef.current!, emailErrorRef.current!);
    }

    if (passwordCurrentValue.length === 0) {
      console.log(passwordCurrentValue?.length + " length");

      // validate the null value

      console.log(passwordCurrentValue?.length + " length");

      displayError(
        passwordRef.current!,
        passwordErrorRef.current!,
        "Password must be filled"
      );
      return;
    } else {
      hideError(passwordRef.current!, passwordErrorRef.current!);
    }

    var accountObject = {
      displayName: fnameRef.current!.value,
      gmail: emailRef.current!.value,
      password: passwordRef.current!.value,
    };


    // create account in backend
    // axios.post(url + database + "create", accountObject).then((res) => {
    //   console.log(res.data);

    //   if (res.data) {
    //     navigate("/login", { replace: true });
    //   } else {
        
    //     signUpErrorRef.current!.style.color = "#c92432";
    //     signUpErrorRef.current!.innerHTML = "This email is already registed!"
    //   }

    // });

    var userCredential ={
      displayName: fnameRef.current!.value,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
      matchingPassword: passwordRef.current!.value
    }

    axios.post(AppConstants.AUTH_API+'signup',{
      displayName: userCredential.displayName,
      email: userCredential.email,
      password: userCredential.password,
      matchingPassword: userCredential.matchingPassword,
      socialProvider: 'LOCAL'
    }, {
      headers:{
          'Content-Type':'application/json'
      }
    }).then(res =>{
        console.log(res)
        navigate('/login')
        
    }).catch(res => {
      console.log(res)
      setOpen(true)
    })

    // authService.register(userCredential)
  };

  const [open, setOpen] = React.useState(false);



  const handleClose = () => {
    setOpen(false);
  };
  // hide the error if validate the result
  const hideError = (field: HTMLElement, text: HTMLElement) => {
    text.innerHTML = "";
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
    if (passwordRef.current?.type === "password") {
      passwordRef.current.type = "text";
    } else if (passwordRef.current?.type === "text") {
      passwordRef.current.type = "password";
    }
  };

  return (
    <div className="split-screen">
      <div className="left">
        <section className="logo-container">
          <div id="logo-text">Showcase</div>
        </section>
        <section className="copy">
          <h1>Explore different projects</h1>
          <p>Over 100+ projects delivered from numerous majors</p>
        </section>
      </div>
      <div className="right">
        <form
          id="signup-form"
          onSubmit={(event) => {
            event.preventDefault();
            return false;
          }}
        >
          <section className="copy">
            <h2>Sign Up</h2>
            <div className="login container">
              <p>
                Already have an account?
                <a href="/login">
                  {" "}<strong> Log in here</strong>
                </a>
              </p>
            </div>
          </section>
          <div className="input-container name">
            <label htmlFor="fname">Full Name</label>
            <input
              id="fname"
              type="text"
              maxLength={40}
              ref={fnameRef}
              // oninput="displayNormal(this)"
            />
          </div>
          <p id="fname-error" className="error-text" ref={fnameErrorRef}></p>
          <div className="input-container email">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              ref={emailRef}
              maxLength={40}
              // oninput="displayNormal(this)"
            />
          </div>
          <p id="email-error" ref={emailErrorRef} className="error-text"></p>
          <div className="input-container password">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Must be at least 6 characters"
              maxLength={128}
              ref={passwordRef}
              // oninput="displayNormal(this)"
            />
            <i
              id="visibility-icon"
              // onClick="togglePasswordVisibility()"
              className="far fa-eye-slash"
            ></i>
          </div>
          <p
            id="password-error"
            ref={passwordErrorRef}
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
          <br />
          <span id="showSignupError" ref={signUpErrorRef}></span>

          <button
            onClick={() => validateSignupForm()}
            className="signup-btn"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ backgroundColor : "#F5F5F5"}}>
        <DialogTitle id="alert-dialog-title" style={{fontWeight: "bolder" ,width: "400px"}}>
          Unable to sign up
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontSize: "20px"}} id="alert-dialog-description">
            Email already exists
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}   variant="contained">
            Ok
          </Button>
        </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default SignupPage;
