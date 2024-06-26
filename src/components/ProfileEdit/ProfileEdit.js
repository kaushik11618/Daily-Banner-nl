import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import "./ProfileEdit.css";

export const ProfileEdit = ({
                              fetchUserProfile,
                              currentUser,
                              setCurrentUser,

                            }) => {
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const upadateProfile = async (event) => {
    event.preventDefault();
    try {
      const updatedUserData = {
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        phoneNumber: parseInt(currentUser.phoneNumber),
        address: currentUser.address,
      };
      const response = await fetch(
          "http://localhost:3000/api/auth/update",
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
        fetchUserProfile();
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
  useEffect(() => {
    if (!currentUser && isLoading) {
      fetchUserProfile();
      setIsLoading(false);
    }
  }, [currentUser, fetchUserProfile, isLoading]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className=" container profile">
        <div className="profile-container">
          <div className="profile-title">Profile</div>
          <div className="content mt-3">
            <form className="profile-form" onSubmit={upadateProfile}>
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
                  <span className="details">Email</span>
                  <input
                    type="email"
                    onChange={getInput}
                    placeholder="Email"
                    name="email"
                    value={currentUser.email}
                    required
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
              </div>
              <div className="gender-details">
                <span className="details">Address</span>
                <textarea
                    required
                    onChange={getInput}
                    className="common-textArea w-100 p-3 mt-2"
                    placeholder="Address"
                    name="address"
                    value={currentUser.address}
                />
              </div>
              <div className="save-container">
                <button className="save-btn btn-primary p-3 w-25 text-center">
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
