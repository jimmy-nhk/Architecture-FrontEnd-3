import React from "react";

import "./style.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Checkbox } from "@mui/material";

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

function LoginPage() {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const passwordError = useRef<HTMLParagraphElement>(null);
  const emailError = useRef<HTMLParagraphElement>(null);

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
      }
    }


    // navigate("/", { replace: true });
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
          </form>
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default LoginPage;
