import React from "react";

import "./style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function LoginPage() {
  let navigate = useNavigate();

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const validateLoginForm = () => {
    console.log(username.current?.value);
    console.log("Direct to main");
    console.log(password.current?.value);
    // navigate("/", { replace: true });
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
              <i
                id="visibility-icon"
                //   onClick="togglePasswordVisibility()"
                className="far fa-eye-slash"
              ></i>
            </div>
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
    </div>
  );
}

export default LoginPage;
