import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://192.168.29.12:3000/api/auth/login`,
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      console.log("access Token", token);
    } catch (error) {
      console.log("Login error", error);
    }
  };
  return (
    <>
      <div className="login">
        <div className="container">
          <div className="row h-100 justify-content-center align-items-center bg-secondary rounded">
            <form className="col-md-9" onSubmit={handleSubmit}>
              <div className="AppForm shadow-lg">
                <div className="row">
                  <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="AppFormLeft p-5">
                      <h1 className="text-center">Login</h1>
                      <div className="form-group position-relative mb-4">
                        <input
                          type="email"
                          className="form-control mt-5 border-top-0 border-right-0 border-left-0 rounded shadow-none"
                          value={email}
                          onChange={handleEmailChange}
                          placeholder="Your Email"
                        />
                      </div>
                      <div className="form-group position-relative mb-4">
                        <input
                          type="password"
                          className="form-control border-top-0 border-right-0 border-left-0 rounded shadow-none"
                          value={password}
                          onChange={handlePasswordChange}
                          placeholder="Password"
                        />
                      </div>

                      <button
                        className="btn btn-success btn-block shadow border-0 py-2  text-uppercase "
                        style={{ position: "relative" }}
                      >
                        <Link to="/home"> Login </Link>
                      </button>

                      <p
                        className="text-center mt-5"
                        style={{ position: "relative" }}
                      >
                        Don't have an account?
                        <Link to="/register">Create your account</Link>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 m-5 w-100                         text-white">
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

// import React, {
//     useState
// } from "react";
// // import './Login.css'
// // import {
//     Link
// } from "react-router-dom";
// import axios from "axios";
// function Login() {
//
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value)
//   }
//
//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value)
//   }
//
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//
//     try {
//       const response = await axios.post(`http://192.168.29.12:3000/api/auth/login`,{
//         email,
//         password,
//       })
//
//       const token = response.data.token;
//       console.log('access Token', token)
//     } catch (error) {
//       console.log('Login error', error)
//     }
//   }
//   return (
//       <>
//         <div className="app">
//           <div className="login-form">
//             <h1 className="title text-center fs-1 fw-bold ">Login</h1>
//             <p className='text-center'>login here using your username and password</p>
//             <div className='id2' >
//               <div className="form">
//                 <form onSubmit={handleSubmit}>
//                   <div className="input-text">
//                     <h4 className='font-weight-bold'>Email:</h4>
//                     <input type='email' className='ml-5' value={email} onChange={handleEmailChange} />
//                   </div>
//                   <div className="input-text">
//                     <h4 className='font-weight-bold'>Password:</h4>
//                     <input type='password' value={password} onChange={handlePasswordChange} />
//                   </div>
//                   <div className="button">
//                     <input type="submit" />
//                   </div>
//                   <p className="forgot-password mt-5 text-center">
//                     Forgot <a href="">password?</a>
//                   </p>
//                   <p className="text-center  ">
//                     Sign Up <Link to="/register">Create an account ?</Link>
//                   </p>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//   );
// }
//
// export default Login;
//
//
//
//
//
//
//

// import { useNavigate } from "react-router";
// import "./Login.css";
// export const Login = () => {
//   // const [credentials, setCredentials] = useState({});
//   let navigate = useNavigate();
//   return (
//     <div className="overlay">
//       <form>
//         <div className="con">
//           <header className="head-form">
//             <h2>Sign In</h2>
//             <p>login here using your username and password</p>
//           </header>
//
//           <br></br>
//           <div className="field-set">
//             <span className="input-item">
//               <i className="fa fa-user-circle"></i>
//             </span>
//             <input
//               className="form-input"
//               id="txt-input"
//               type="text"
//               placeholder="@UserName"
//               required
//             />
//             <br></br>
//             <span className="input-item">
//               <i className="fa fa-key"></i>
//             </span>
//             <input
//               className="form-input"
//               type="password"
//               placeholder="Password"
//               id="pwd"
//               name="password"
//               required
//             />
//             <br></br>
//             <button className="log-in"> Log In </button>
//           </div>
//           <div className="other">
//             <button className="btn submits frgt-pass">Forgot Password</button>
//             <button className="btn submits sign-up" onClick={() => navigate("/register")}>
//               Sign Up
//               <i className="fa fa-user-plus" aria-hidden="true"></i>
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };
