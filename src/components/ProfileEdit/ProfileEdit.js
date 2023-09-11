import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
  const upadateProfile = async (event) => {
    event.preventDefault();
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
        const apiMessage = await response.json();
        toast.success(apiMessage.message);
      } else {
        const errorMessage = await response.json();
        toast.error(errorMessage.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile.");
    }
  };
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setCurrentUser({ ...currentUser, ...input });
  };

  return (
    <>
      <div className=" container profile">
        <div className="profile-container">
          <div className="profile-title">Profile</div>
          <div className="content mt-3">
            <form className="profile-form">
              <div className="user-details">
                <div className="input-box1">
                  <span className="details">First Name</span>
                  <input
                    required
                    onChange={getInput}
                    placeholder="first Name"
                    name="first_name"
                    value={currentUser.first_name}
                  />
                </div>
                <div className="input-box1">
                  <span className="details">Last Name</span>
                  <input
                    required
                    onChange={getInput}
                    placeholder="Last Name"
                    name="last_name"
                    value={currentUser.last_name}
                  />
                </div>
                <div className="input-box1">
                  <span className="details">Phone Number</span>
                  <input
                    required
                    onChange={getInput}
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={currentUser.phoneNumber}
                  />
                </div>
                <div className="input-box1">
                  <span className="details">Company</span>
                  <input
                    required
                    onChange={getInput}
                    placeholder="Company"
                    name="company_name"
                    value={currentUser.company_name}
                  />
                </div>
                <div className="input-box1">
                  <span className="details">Instagram</span>
                  <input
                    onChange={getInput}
                    placeholder="Instagram"
                    name="instagram"
                    value={currentUser.instagram}
                  />
                </div>
                <div className="input-box1">
                  <span className="details">Linkedin</span>
                  <input
                    onChange={getInput}
                    placeholder="Linkedin"
                    name="linkedin"
                    value={currentUser.linkedin}
                  />
                </div>
                <div className="input-box1">
                  <span className="details">Facebook</span>
                  <input
                    onChange={getInput}
                    placeholder="Facebook"
                    name="facebook"
                    value={currentUser.facebook}
                  />
                </div>
                <div className="input-box1">
                  <span className="details">Twitter</span>
                  <input
                    onChange={getInput}
                    placeholder="Twitter"
                    name="twitter"
                    value={currentUser.twitter}
                  />
                </div>
              </div>
              <div className="gender-details">
                <span className="details">Address</span>
                <textarea
                  required
                  onChange={getInput}
                  className="common-textArea "
                  placeholder="Address"
                  name="address"
                  value={currentUser.address}
                />
              </div>
              <div className="save-container">
                <button
                  className="save-btn btn-primary p-3 w-25 text-center "
                  onClick={(event) => {
                    upadateProfile(event);
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
