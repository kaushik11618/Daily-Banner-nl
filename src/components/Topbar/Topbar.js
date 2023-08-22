import React, { useState } from "react";
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
    </nav>
  );
};
