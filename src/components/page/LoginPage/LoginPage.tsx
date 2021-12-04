import React from "react";

import "./style.css";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Checkbox } from "@mui/material";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function LoginPage() {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const validateLoginForm = () => {
    console.log(username.current?.value);
    console.log("Direct to main");
    console.log(password.current?.value);
    // navigate("/", { replace: true });
  };
  
  // validate the toggle password
  const togglePasswordVisibility = () => {

    if(password.current?.type === "password"){
      password.current.type = "text";

    } else if(password.current?.type === "text" ){
      password.current.type = "password";
    }
  }

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
            onSubmit={() => {
              return false;
            }}
          >
            <section className="copy">
              <h2>Login To Your Account</h2>
            </section>
            <div className="input-container email">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" maxLength={40} ref={username} />
            </div>
            <p id="email-error" className="error-text"></p>
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
            <span>
              <input type="checkbox" id="passwordVisibility" onClick={togglePasswordVisibility}  />
               <span style={{marginLeft: "10px"}}>Show Password</span>
            </span>
            <p id="password-error" className="error-text"></p>

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
        onClose={handleClose}
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
