import React, {useEffect, useState} from "react";
import {ProfilePopup} from "../ProfilePopup/ProfilePopup";
import "./Topbar.css";

export const Topbar = ({ onLinkClick }) => {
  const dropdownOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };
  const togglePopup = () => {
    setPopupOpen(!popupVisible);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
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

  return (
    <nav>
      <div className="dropdown">
      </div>
      <p style={{
        color: "white",
        cursor: "pointer",
        border: '1px solid white',
        fontSize: '15px',
        borderRadius: '20px',
        width: '150px',
        textAlign: 'center',
        padding: '5px'
      }} onClick={displayPopup}>
        {currentUser ? `Welcome, ${currentUser.first_name}` : "Loading..."}
      </p>
      {popupVisible ? (
        <div className="popup-container">
          <ProfilePopup
            currentUser={currentUser}
            onLinkClick={onLinkClick}
            onClose={togglePopup}
          />
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};
