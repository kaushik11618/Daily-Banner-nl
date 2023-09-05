import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") !== "" &&
      localStorage.getItem("token") !== null
    ) {
      navigate("/home");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://192.168.29.12:3000/api/auth/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/home");
      toast.success("Login successful!");
    } catch (err) {
      console.log(err);
      toast.error("Please check your credentials.");
    }
  };

  return (
    <>
      <div className="login">
        <div className=" h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <form className="col-md-9" onSubmit={handleSubmit}>
              <div className="AppForm shadow-lg">
                <div className="row">
                  <div className="col-md-6 d-flex justify-content-center bg-secondary align-items-center">
                    <div className="AppFormLeft">
                      <h1 className="text-center mb-5 text-light">Login</h1>
                      <div className="form-group position-relative mb-4">
                        <input
                          type="text"
                          className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                          id="username"
                          placeholder="Username"
                          value={email}
                          onChange={handleEmailChange}
                        />
                      </div>
                      <div className="form-group position-relative mb-4">
                        <input
                          type="password"
                          className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                          id="password"
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <button className="btn btn-success btn-block shadow border-0 py-2 text-uppercase ">
                        Login
                      </button>
                      <h4 className="text-center mt-5">
                        Don't have an account?
                        <span className="">
                          <Link to="/register"> Create your account </Link>
                        </span>
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
                      <h2 className="position-relative px-4 pb-3 mb-4">
                        Welcome
                      </h2>
                      <p>
                        Lorem ipsuing elit. Molomos totam est voluptatum i omos
                        totam est voluptatum i ure sit consectetur ill
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
