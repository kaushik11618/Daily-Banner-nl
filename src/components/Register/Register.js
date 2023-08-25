import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Register.css";
export const Register = () => {
  const navigate = useNavigate("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      instagram: instagram || null,
      linkedin: linkedin || null,
      facebook: facebook || null,
      twitter: twitter || null,
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
          navigate("/");
        })

        .catch((e) => {
          setIsSubmitting(false);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="register">
        <div className="register-container">
          <div className="register-title">Registration</div>
          <div className="content">
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">First Name</span>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Last Name</span>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Password</span>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Company Name</span>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={companyname}
                    onChange={(e) => setCompanyname(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Phone Number</span>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Linkedin ID</span>
                  <input
                    type="text"
                    placeholder="Linkedin Id"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Instagram Id</span>
                  <input
                    type="text"
                    placeholder="Instagram Id"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Facebook Id</span>
                  <input
                    type="text"
                    placeholder="Facebokk ID"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Twitter Id</span>
                  <input
                    type="text"
                    placeholder="Twitter Id"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
              </div>
              <div class="gender-details">
                <div className="input-box">
                  <span className="details">Address</span>
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="rgister-btn">
                <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
