import React, { useState } from "react";
import "./Sidebar.css";
import { FaBars } from "react-icons/fa";
import { MdOutlineFestival } from "react-icons/md";
import { FcDebian } from "react-icons/fc";

export const Sidebar = ({ onLinkClick }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Dashboard
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <h2 onClick={() => onLinkClick("festival")}>
          &nbsp; <MdOutlineFestival style={{ fontSize: "30px" }} />
          <strong
            style={{
              display: isOpen ? "block" : "none",
              position: "relative",
              left: "50px",
              bottom: "40px",
            }}
          >
            Category
          
          </strong>
        </h2>
        <h2 onClick={() => onLinkClick("about")}>
          &nbsp; <FcDebian style={{ fontSize: "30px" }} />
          <strong
            style={{
              display: isOpen ? "block" : "none",
              position: "relative",
              left: "50px",
              bottom: "40px",
            }}
          >
            About
          </strong>
        </h2>
        <h2>
          &nbsp; <MdOutlineFestival style={{ fontSize: "30px" }} />
          <strong
            style={{
              display: isOpen ? "block" : "none",
              position: "relative",
              left: "50px",
              bottom: "40px",
            }}
          >
            logout
          </strong>
        </h2>
      </div>
    </>
  );
};
