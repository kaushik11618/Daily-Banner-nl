import React, {useState} from "react";
import {Collapse, FormControlLabel, Switch} from "@mui/material";

function Toggle({categoryStatus, categoryId, ontoggle}) {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const checked = categoryStatus === "active" ? false : true;

  const toggleInfo = async (e) => {
    e.preventDefault();
    setIsInfoVisible(!isInfoVisible);
    const token = localStorage.getItem("token");
    try {
      await fetch("http://192.168.29.12:3000/api/category/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: categoryId,
        }),
      });
      if (typeof ontoggle === "function") {
        ontoggle();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
      <div>
        <FormControlLabel
            control={<Switch checked={checked}/>}
            onClick={toggleInfo}
            className='ms-5 mt-2'
        >
          {isInfoVisible ? "Hide Info" : "Show Info"}

        </FormControlLabel>

        <Collapse in={isInfoVisible}>
          {/* Your dropdown content goes here */}
          <div className="dropdown">
            {/* Dropdown content */}
            {/* ... */}
          </div>
        </Collapse>
      </div>
  );
}

export default Toggle;
