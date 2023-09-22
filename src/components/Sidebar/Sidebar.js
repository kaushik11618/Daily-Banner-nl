import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CategoryIcon from "@mui/icons-material/Category";
import DehazeIcon from "@mui/icons-material/Dehaze";
import GroupIcon from "@mui/icons-material/Group";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Sidebar.css";

export const Sidebar = ({ onLinkClick, isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userRole, setUserRole] = useState("");

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
        toggleSidebar();
      }
    };
    window.addEventListener("resize", handleResize);

    const fetchUserProfile = async () => {
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
          setUserRole(userData.role);
        }
      } catch (error) {}
    };
    fetchUserProfile();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [token]);

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
          <DehazeIcon fontSize="16px" onClick={toggleSidebar} />
        </div>
      </div>
      {userRole === "admin" ? (
        <h2
          onClick={() => onLinkClick("category")}
          className="link"
          role="button"
          style={{ display: userRole === "admin" ? "block" : "none" }}
        >
          &nbsp; <CategoryIcon style={{ fontSize: "30px" }} />
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
      ) : (
        <h2
          onClick={() => onLinkClick("company")}
          className="link"
          role="button"
        >
          &nbsp; <AddBusinessIcon style={{ fontSize: "30px" }} />
          <strong
            style={{
              display: isOpen ? "block" : "none",
              marginInlineStart: "50px",
              position: "relative",
              bottom: "25px",
            }}
          >
            Company
          </strong>
        </h2>
      )}
      {userRole === "admin" ? (
        <h2
          onClick={() => onLinkClick("user")}
          className="link"
          role="button"
          style={{ display: userRole === "admin" ? "block" : "none" }}
        >
          &nbsp; <GroupIcon style={{ fontSize: "30px" }} />
          <strong
            style={{
              display: isOpen ? "block" : "none",
              marginInlineStart: "50px",
              position: "relative",
              bottom: "25px",
            }}
          >
            UserMenu
          </strong>
        </h2>
      ) : (
        <></>
      )}
      {userRole === "user" ? (
        <h2 onClick={() => onLinkClick("post")} className="link" role="button">
          &nbsp;{" "}
          <PostAddOutlinedIcon style={{ fontSize: "30px" }} className="ct" />
          <strong
            style={{
              display: isOpen ? "block" : "none",
              marginInlineStart: "50px",
              position: "relative",
              bottom: "25px",
            }}
          >
            Post
          </strong>
        </h2>
      ) : (
        <></>
      )}
      <h2 onClick={() => onLinkClick("about")} className="link" role="button">
        &nbsp; <InfoIcon style={{ fontSize: "30px" }} className="ct" />
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
        <LogoutIcon
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
            width: "100px",
          }}
          onClick={handleLogout}
        >
          logout
        </button>
      </h2>
    </div>
  );
};
