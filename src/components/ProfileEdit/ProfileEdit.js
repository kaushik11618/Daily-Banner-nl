import React, { useEffect, useState } from "react";
import "./ProfileEdit.css";

export const ProfileEdit = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://192.168.29.12:3000/api/auth/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          console.log("userData", userData);
          setCurrentUser(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, []);
  console.log(currentUser);
  const upadateProfile = async () => {
    try {
      const updatedUserData = {
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        phoneNumber: parseInt(currentUser.phoneNumber),
        address: currentUser.address,
        company_name: currentUser.company_name,
        linkedin: currentUser.linkedin || null,
        instagram: currentUser.instagram || null,
        facebook: currentUser.facebook || null,
        twitter: currentUser.twitter || null,
      };
      const response = await fetch(
        "http://192.168.29.12:3000/api/auth/update",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUserData),
        }
      );

      if (response.ok) {
        console.log("Profile updated successfully");
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setCurrentUser({ ...currentUser, ...input });
  };
  return (
    <div className="profile-card">
      <div className="profile-edit-inputs">
        <div className="input-content">
          <label>First Name</label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="first Name"
            name="first_name"
            value={currentUser.first_name}
          />
        </div>
        <div className="input-content">
          <label>Last Name</label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="Last Name"
            name="last_name"
            value={currentUser.last_name}
          />
        </div>
        <div className="input-content">
          <label>Phone Number</label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="Phone Number"
            name="phoneNumber"
            value={currentUser.phoneNumber}
          />
        </div>
        <div className="input-content">
          <label>Company</label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="Company"
            name="company_name"
            value={currentUser.company_name}
          />
        </div>
        <div className="input-content">
          <label>Instagram </label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="Instagram"
            name="instagram"
            value={currentUser.instagram}
          />
        </div>
        <div className="input-content">
          <label>Linkedin</label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="Linkedin"
            name="linkedin"
            value={currentUser.linkedin}
          />
        </div>
        <div className="input-content">
          <label>facebook</label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="Facebook"
            name="facebook"
            value={currentUser.facebook}
          />
        </div>
        <div className="input-content">
          <label>Twitter</label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="Twitter"
            name="twitter"
            value={currentUser.twitter}
          />
        </div>
      </div>
      <div className="textArea-content">
        <label>Address</label>
        <textarea
          onChange={getInput}
          className="common-textArea"
          placeholder="Address"
          name="address"
          value={currentUser.address}
        />
      </div>
      <div className="save-container">
        <button className="save-btn" onClick={upadateProfile}>
          Save
        </button>
      </div>
    </div>
  );
};
