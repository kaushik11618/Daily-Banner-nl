import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Register = () => {
  const navigate = useNavigate("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
        navigate("/home");
    }
},[])
  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestData = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
      address: address,
      company_name: companyname,
      phoneNumber: parseInt(phonenumber),
    };

    try {
      axios
        .post("http://192.168.29.12:3000/api/auth/register", requestData, {
          header: {
            "Content-Type": "application/json",
          },
        })
        .then((r) => {
          setIsSubmitting(false);
          localStorage.setItem("token", r.data.token);
          navigate("/home");
        })

        .then((r) => {
          setIsSubmitting(false);
          localStorage.setItem("token", r.data.token);
          navigate("/home");
        })
        .catch((e) => {
          setIsSubmitting(false);
         
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="con">
        <header className="head-form">
          <h2>Sign Up</h2>
        </header>

        <br></br>
        <div className="">
          <input
            type="text"
            className="form-input"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            className="form-input"
            placeholder="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Companyname"
            value={companyname}
            onChange={(e) => setCompanyname(e.target.value)}
          />
          <input
            type="number"
            className="form-input"
            placeholder="Phonenumber"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
          />
          <button type="submit">Register</button>
        </div>
      </div>
    </form>
  );
};
