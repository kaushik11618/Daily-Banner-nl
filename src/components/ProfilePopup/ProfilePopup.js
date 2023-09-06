import React from "react";
import "./ProfilePopup.css";

export const ProfilePopup = ({ currentUser, onLinkClick ,onClose }) => {
  console.log(currentUser);
  return (
    <div className="popup-card">
        <p className=".profile-name">{currentUser.first_name}</p>
        <p className=".profile-headline ">fdgdfdgfgdgdf</p>
        <button
            onClick={() => {
                onLinkClick("profile");
                onClose()
            }}
        >
            Profile
        </button>
        <button
            onClick={() => {
                onLinkClick("password");
                onClose()
            }}
        >
            Change Password
        </button>

    </div>
  );
};
