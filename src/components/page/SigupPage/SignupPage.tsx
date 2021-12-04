import React from 'react'
import { useNavigate  } from "react-router-dom";


function SignupPage() {

    let navigate = useNavigate();

    const validateSignupForm = () =>{

        console.log("Direct to login")
        navigate("/login", { replace: true });
    }

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
            onSubmit={() => {return false;}}
          >
            <section className="copy">
              <h2>Sign Up</h2>
              <div className="login container">
                <p>
                  Already have an account?
                  <a href="../LoginPage/login.html">
                    <strong>Login here</strong></a
                  >
                </p>
              </div>
            </section>
            <div className="input-container name">
              <label htmlFor="fname">Full Name</label>
              <input
                id="fname"
                type="text"
                maxLength={40}
                // oninput="displayNormal(this)"
              />
            </div>
            <p id="fname-error" className="error-text"></p>
            <div className="input-container email">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                maxLength={40}
                // oninput="displayNormal(this)"
              />
            </div>
            <p id="email-error" className="error-text"></p>
            <div className="input-container password">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Must be at least 6 characters"
                maxLength={128}
                // oninput="displayNormal(this)"
              /><i
                id="visibility-icon"
                // onClick="togglePasswordVisibility()"
                className="far fa-eye-slash"
              ></i>
            </div>
            <p id="password-error" className="error-text"></p>

            <button
            
              onClick={() => validateSignupForm()}
              className="signup-btn"
              type="submit"
            >
              Sign Up
            </button>

          </form>
        </div>
      </div>
    )
}

export default SignupPage
