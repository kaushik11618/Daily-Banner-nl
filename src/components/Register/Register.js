import React, { useState } from "react";
import { useNavigate } from "react-router";

export const Register = () => {
  let navigate = useNavigate("");
  const [registerInput, setRegisterInput] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    address: "",
    phoneNumber: "",
    email: "",
    facebookId: "",
    twitterId: "",
    instagramId: "",
    linkedinId: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/home");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="con">
        <header className="head-form">
          <h2>Sign Up</h2>
        </header>

        <br></br>
        <div className="field-set">
          <input
            onChange={handleInputChange}
            className="form-input"
            placeholder="First Name"
            name="firstName"
            value={registerInput.firstName}
            required
          />
          <input
            onChange={handleInputChange}
            className="form-input"
            placeholder="Last Name"
            name="lastName"
            value={registerInput.lastName}
            required
          />
          <input
            onChange={handleInputChange}
            className="form-input"
            placeholder="Company Name"
            name="companyName"
            value={registerInput.companyName}
            required
          />
          <input
            onChange={handleInputChange}
            className="form-input"
            placeholder="Address"
            name="address"
            value={registerInput.address}
            required
          />
          <input
            onChange={handleInputChange}
            className="form-input"
            placeholder="Phone Number"
            name="phoneNumber"
            value={registerInput.phoneNumber}
            required
          />
          <input
            onChange={handleInputChange}
            className="form-input"
            placeholder="Email"
            name="email"
            type="email"
            value={registerInput.email}
            required
          />
          <input
            onChange={handleInputChange}
            className="form-input"
            placeholder="Facebook ID"
            name="facebookId"
            value={registerInput.facebookId}
          />
          <input
            onChange={handleInputChange}
            className="form-input"
            placeholder="Twitter ID"
            name="twitterId"
            value={registerInput.twitterId}
          />
          <input
            onChange={handleInputChange}
            className="form-input"
            placeholder="Instagram ID"
            name="instagramId"
            value={registerInput.instagramId}
          />
          <input
            onChange={handleInputChange}
            className="form-input"
            placeholder="Linkedin ID"
            name="linkedinId"
            value={registerInput.linkedinId}
          />
          <button type="submit">Register</button>
        </div>
      </div>
    </form>
  );
};
