import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {About} from "../About/About.js";
import {Category} from "../Category/Category";
import ChangePassword from "../ChangePassword/ChangePassword";
import Company from "../Company/Company.js";
import {ProfileEdit} from "../ProfileEdit/ProfileEdit.js";
import {Sidebar} from "../Sidebar/Sidebar";
import {Topbar} from "../Topbar/Topbar";
import "./Home.css";

let isMounted = true;
export const Home = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [activeContent, setActiveContent] = useState(
    window.location.pathname.replace("/", "")
  );
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");

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
      if (isMounted) {
        if (response.ok) {
          const userData = await response.json();
          setUserRole(userData.role);
          setCurrentUser(userData);
        }
        setIsLoading(false);
      }
    } catch (error) {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    if (activeContent === "category") {
      if (userRole === "admin") {
        navigate("/category");
      } else {
        navigate("/home");
      }
    } else if (activeContent === "company") {
      if (userRole === "user") {
        navigate("/company");
      }
    } else if (activeContent === "about") {
      navigate("/about");
    } else if (activeContent === "profile") {
      navigate("/profile");
    } else if (activeContent === "password") {
      navigate("/password");
    }

    fetchUserProfile();
  }, [activeContent, navigate]);

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
          <Topbar onLinkClick={handleLinkClick} currentUser={currentUser} />
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
                <Category/>
            )}
            {userRole === "user" && activeContent === "company" && <Company/>}
            {activeContent === "about" && <About/>}
            {activeContent === "profile" && (
              <ProfileEdit
                fetchUserProfile={fetchUserProfile}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
            {activeContent === "password" && <ChangePassword />}
          </div>
        </div>
      </div>
    </>
  );
};
