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
        <label>First Name</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="first Name"
          name="first_name"
          value={currentUser.first_name}
        />
        <label>Last Name</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Last Name"
          name="last_name"
          value={currentUser.last_name}
        />
        <label>Address</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Address"
          name="address"
          value={currentUser.address}
        />
        <label>Phone Number</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Phone Number"
          name="phoneNumber"
          value={currentUser.phoneNumber}
        />
        <label>Company</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Company"
          name="company_name"
          value={currentUser.company_name}
        />
        <label>Instagram </label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Instagram"
          name="instagram"
          value={currentUser.instagram}
        />
        <label>Linkedin</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Linkedin"
          name="linkedin"
          value={currentUser.linkedin}
        />
        <label>facebook</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="facebook"
          name="facebook"
          value={currentUser.facebook}
        />
        <label>Twitter</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="twitter"
          name="twitter"
          value={currentUser.twitter}
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
