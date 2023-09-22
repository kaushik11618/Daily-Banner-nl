import React, {useState} from "react";
import {toast} from "react-toastify";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "current_password":
        setCurrentPassword(value);
        break;
      case "new_password":
        setNewPassword(value);
        break;
      case "confirm_password":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    const requestBody = {
      current_password: currentPassword,
      new_password: newPassword,
    };

    fetch("http://localhost:3000/api/auth/change-password", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Password changed successfully");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          toast.error("Failed to change password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container password">
      <div className="p-5 text-center mt-5">
        <h1>Enter Your Password</h1>
        <input
          type="password"
          placeholder="Current Password"
          name="current_password"
          className="p-3 w-50 mt-5"
          value={currentPassword}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="password"
          placeholder="New Password"
          name="new_password"
          className="p-3 w-50 mt-5"
          value={newPassword}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirm_password"
          className="p-3 w-50 mt-5"
          value={confirmPassword}
          onChange={handleInputChange}
        />
        <br />
        <button
          className="btn btn-primary w-25 mt-3 p-3"
          onClick={handlePasswordChange}
        >
          <h3>Save</h3>
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
