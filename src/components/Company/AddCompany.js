import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddCompany = ({ handleAddCompanySuccess}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = async (e) => {
    e.preventDefault();
    const selectedImage = e.target.files[0]; 
    setImage(selectedImage);
  };

  const submitDataToAPI = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phoneNumber", parseInt(phonenumber));
    formData.append("state", state);
    formData.append("city", city);
    formData.append("image", image);
    formData.append("pinCode", parseInt(pinCode));
    formData.append("email", email);
    formData.append("address", address);
    formData.append("instagram", instagram);
    formData.append("linkedin", linkedin);
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);

    try {
      const response = await fetch(
        "http://192.168.29.12:3000/api/company/add",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          toast.success(data.message);
          handleAddCompanySuccess()
        } else {
          toast.error("Registration failed. Please check your data.");
        }
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="register">
        <div className="register-container">
          <div className="register-title">Company Registration</div>
          <div className="content">
            <form className="register-form" onSubmit={submitDataToAPI}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Name</span>
                  <input
                    type="text"
                    placeholder="company Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                  <span className="details">state</span>
                  <input
                    type="state"
                    placeholder="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Pincode</span>
                  <input
                    type="number"
                    placeholder="Pincde"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">City</span>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
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
                  <span className="details">Instagram ID</span>
                  <input
                    type="text"
                    placeholder="Instagram Id"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Facebook ID</span>
                  <input
                    type="text"
                    placeholder="Facebokk ID"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Twitter ID</span>
                  <input
                    type="text"
                    placeholder="Twitter Id"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Twitter ID</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} 
                  />
                </div>
              </div>
              <div className="gender-details">
                <div className="input-box">
                  <span className="details">Address</span>
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    // required
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

export default AddCompany;
