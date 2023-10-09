import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddCompany = ({ handleAddCompanySuccess, editCompanyId }) => {
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
  const token = localStorage.getItem("token");
  const handleImageChange = async (e) => {
    e.preventDefault();
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const submitDataToAPI = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phoneNumber", parseInt(phonenumber));
    formData.append("state", state);
    formData.append("city", city);
    formData.append("image", image);
    formData.append("pinCode", parseInt(pinCode));
    formData.append("email", email);
    formData.append("address", address);
    formData.append("instagram", instagram || null);
    formData.append("linkedin", linkedin || null);
    formData.append("facebook", facebook || null);
    formData.append("twitter", twitter || null);

    if (editCompanyId) {
      try {
        const response = await fetch(
          `http://192.168.29.12:3000/api/company/${editCompanyId}`,
          {
            method: "PUT", // Use PUT method for updating
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          toast.success(data.message);
          handleAddCompanySuccess();
        } else {
          console.error(`HTTP Error: ${response.status}`);
        }
      } catch (error) {
        console.error("Error updating company:", error);
      }
    } else {
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
          toast.success(data.message);
          handleAddCompanySuccess();
        } else {
          console.error(`HTTP Error: ${response.status}`);
        }
      } catch (error) {
        console.error("Error adding company:", error);
      }
    }
  };

  useEffect(() => {
    if (editCompanyId) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://192.168.29.12:3000/api/company/${editCompanyId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const companyData = await response.json();
            setName(companyData.name);
            setEmail(companyData.email);
            setPhonenumber(companyData.phoneNumber);
            setCity(companyData.city);
            setState(companyData.state);
            setImage(companyData.image);
            setPinCode(companyData.pinCode);
            setAddress(companyData.address);
            setInstagram(companyData.instagram);
            setFacebook(companyData.facebook);
            setLinkedin(companyData.linkedin);
            setTwitter(companyData.twitter);
          }
        } catch {}
      };
      fetchData();
    } else {
    }
  }, [editCompanyId]);

  return (
    <>
      <div className="register1">
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
                  <span className="details">Address</span>
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "calc(100% / 2 - 20px)",
                }}
              >
                <span className="details">Image</span>
                <label style={{ fontSize: "16px" }} htmlFor="image">
                  Upload Image
                </label>
                <input
                  style={{ display: "none" }}
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="register-btn">
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
