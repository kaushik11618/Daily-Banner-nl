import React from "react";

export const ProfilePopup = ({ currentUser, onLinkClick, onClose }) => {
  return (
    <div style={{ width: "300px" }}>
      <div className="w-100 border mt-4 border-secondary rounded d-flex justify-content-center flex-column bg-dark text-light">
        <h3 className="text-uppercased d-flex justify-content-center flex-column mt-4 text-center">
          {" "}
          &nbsp;Wel-Come to{" "}
          <strong>
            {currentUser.first_name} {currentUser.last_name}&nbsp;
          </strong>
          <h4 className="text-uppercased d-flex flex-column mt-4">
            {" "}
            Here You Can <br />
            Edit Your Profile and <br />
            Change your Password
          </h4>
        </h3>
        <button
          onClick={() => {
            onLinkClick("profile");
            onClose();
          }}
          className="bg-primary mt-5 p-2"
        >
          Profile
        </button>
        <button
          onClick={() => {
            onLinkClick("password");
            onClose();
          }}
          className="bg-primary mt-3 mb-3 p-2"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};
