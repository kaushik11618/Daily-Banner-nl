import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
export const Login = () => {
  const [credentials, setCredentials] = useState({});
  let navigate = useNavigate();
  return (
    <div className="overlay">
      <form>
        <div className="con">
          <header className="head-form">
            <h2>Sign In</h2>
            <p>login here using your username and password</p>
          </header>
          <br></br>
          <div className="field-set">
            <input
              className="form-input"
              id="txt-input"
              type="text"
              placeholder="@UserName"
              required
            />
            <br></br>
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              id="pwd"
              name="password"
              required
            />

            <button className="log-in"> Log In </button>
          </div>
          <div className="other">
            <button className="btn submits frgt-pass">
              Forgot <br></br>Password
            </button>
            <button
              className="btn submits sign-up"
              onClick={() => navigate("/register")}
            >
              Sign Up
              <i className="fa fa-user-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
