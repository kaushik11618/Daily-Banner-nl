import React, {useEffect, useState} from "react";
import {ProfilePopup} from "../ProfilePopup/ProfilePopup";
import "./Topbar.css";

export const Topbar = ({onLinkClick}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const displayPopup = () => {
        setPopupVisible(!popupVisible);
    };
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
    }, [token]);

  return (
      <nav>
          <div
              style={{
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "flex-end",
              }}
          >
              <button
                  style={{
                      border: "1px solid white",
                      borderRadius: "50px",
                      padding: "8px",
                      width: "150px",
                      backgroundColor: "transparent",
                      color: "white",
                      cursor: "pointer",
                  }}
                  onClick={displayPopup}
              >
                  {currentUser ? `Welcome, ${currentUser.first_name}` : "Loading..."}
              </button>
          </div>
          {popupVisible ? (
              <div className="popup-container">
                  <ProfilePopup
                      currentUser={currentUser}
                      onLinkClick={onLinkClick}
                      onClose={() => setPopupVisible(false)}
                  />
              </div>
          ) : (
              <></>
          )}
    </nav>
  );
};
