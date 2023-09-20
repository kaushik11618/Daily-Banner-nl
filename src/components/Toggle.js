import { FormControlLabel, Switch } from "@mui/material";
import React, { useState } from "react";

function Toggle({ categoryStatus, toggleID, ontoggle, toggleType }) {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const checked = categoryStatus === "active" ? true : false;

  const toggleInfo = async (e) => {
    e.preventDefault();
    setIsInfoVisible(!isInfoVisible);
    const token = localStorage.getItem("token");

    let newStatus = categoryStatus === "active" ? "inactive" : "active";
    let confirmationMessage = `Are you sure you want to ${
      newStatus === "active" ? "Activate" : "Inactivate"
    }?`;

    const userConfirmed = window.confirm(confirmationMessage);

    if (userConfirmed) {
      try {
        const endpoint =
          toggleType === "category"
            ? "http://192.168.29.12:3000/api/category/status"
            : "http://192.168.29.12:3000/api/category/status";

        await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: toggleID,
            status: newStatus,
          }),
        });

        if (typeof ontoggle === "function") {
          ontoggle();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <div>
        <FormControlLabel
          control={<Switch checked={checked} />}
          onClick={toggleInfo}
          className="ms-5 mt-1"
        />
      </div>
    </>
  );
}

export default Toggle;
