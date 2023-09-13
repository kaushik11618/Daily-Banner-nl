import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { About } from "../About/About.js";
import { Category } from "../Category/Category";
import { Sidebar } from "../Sidebar/Sidebar";
import { ProfileEdit } from "../ProfileEdit/ProfileEdit.js";
import { Topbar } from "../Topbar/Topbar";
import "./Home.css";
import ChangePassword from "../ChangePassword/ChangePassword";

export const Home = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [activeContent, setActiveContent] = useState(
    window.location.pathname.replace("/", "")
  );
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

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
  }, []);

  useEffect(() => {
    if (activeContent === "category") {
      if (userRole === "admin") {
        navigate("/category");
      } else {
        // If the user is not an admin, navigate to "/home" and avoid rendering "Category."
        navigate("/home");
        return;
      }
    } else if (activeContent === "about") {
      navigate("/about");
    } else if (activeContent === "profile") {
      navigate("/profile");
    } else if (activeContent === "password") {
      navigate("/password");
    }
  }, [activeContent, navigate, userRole]);

  const handleLinkClick = (content) => {
    setActiveContent(content);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed-container">
        <div className="topbar">
          <Topbar onLinkClick={handleLinkClick} />
        </div>
        <div className="sidebarlayout">
          <Sidebar
            onLinkClick={handleLinkClick}
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
          />
          <div
            className="content-wrapper"
            style={{ marginLeft: isOpen ? "280px" : "30px" }}
          >
            {userRole === "admin" && activeContent === "category" && (
              <Category />
            )}
            {activeContent === "about" && <About />}
            {activeContent === "profile" && <ProfileEdit />}
            {activeContent === "password" && <ChangePassword />}
          </div>
        </div>
      </div>
    </>
  );
};
