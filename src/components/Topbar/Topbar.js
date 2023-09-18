import React, { useState } from "react";
import { ProfilePopup } from "../ProfilePopup/ProfilePopup";
import "./Topbar.css";

export const Topbar = ({ onLinkClick ,currentUser}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

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
