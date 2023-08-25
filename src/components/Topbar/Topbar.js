import React, { useState, useEffect } from "react";
import "./Topbar.css";

export const Topbar = () => {
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://192.168.29.12:3000/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Select an option</option>
          {dropdownOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <p>{currentUser ? `Welcome, ${currentUser.first_name}` : "Loading..."}</p>
    </nav>
  );
};
