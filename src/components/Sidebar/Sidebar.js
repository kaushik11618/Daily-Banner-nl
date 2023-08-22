import React from "react";
import "./Sidebar.css";

export const Sidebar = ({ onLinkClick }) => {
  return (
    <div className="sidebar">
      <p className="active" onClick={() => onLinkClick("festival")}>
        Festival
      </p>
      <p onClick={() => onLinkClick("about")}>About</p>
      <p onClick={() => onLinkClick("home")}>Home</p>
    </div>
  );
};
