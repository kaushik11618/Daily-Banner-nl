import React, { useEffect } from "react";
import { BiLogOut, BiSolidCategory } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { FcDebian } from "react-icons/fc";
import { useNavigate } from "react-router";
import "./Sidebar.css";

export const Sidebar = ({ onLinkClick, isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://192.168.29.12:3000/api/auth/logout",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {}
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        toggleSidebar(false);
      } else {
        toggleSidebar(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggleSidebar]);

  return (
    <div style={{ width: isOpen ? "280px" : "50px" }} className="sidebar">
      <div className="top_section">
        <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
          Dashboard
        </h1>
        <div
          style={{ marginLeft: isOpen ? "30px" : "0px", cursor: "pointer" }}
          className="bars"
        >
          <FaBars onClick={toggleSidebar} />
        </div>
      </div>
      <h2
        onClick={() => onLinkClick("category")}
        className="link"
        role="button"
      >
        &nbsp; <BiSolidCategory style={{ fontSize: "30px" }} />
        <strong
          style={{
            display: isOpen ? "block" : "none",
            marginInlineStart: "50px",
            position: "relative",
            bottom: "25px",
          }}
        >
          Category
        </strong>
      </h2>
      <h2 onClick={() => onLinkClick("about")} className="link" role="button">
        &nbsp; <FcDebian style={{ fontSize: "30px" }} className="ct" />
        <strong
          style={{
            display: isOpen ? "block" : "none",
            marginInlineStart: "50px",
            position: "relative",
            bottom: "25px",
          }}
        >
          About
        </strong>
      </h2>
      <h2 role="button">
        &nbsp;{" "}
        <BiLogOut
          style={{ fontSize: "30px" }}
          className="ct"
          onClick={handleLogout}
        />
        <button
          className="log"
          style={{
            display: isOpen ? "block" : "none",
            marginInlineStart: "50px",
            position: "relative",
            bottom: "32px",
            width: "80px",
            backgroundColor: "blue",
          }}
          onClick={handleLogout}
        >
          logout
        </button>
      </h2>
    </div>
  );
};
