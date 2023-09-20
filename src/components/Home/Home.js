import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { About } from "../About/About.js";
import { Category } from "../Category/Category";
import ChangePassword from "../ChangePassword/ChangePassword";
import AddCompany from "../Company/AddCompany";
import Company from "../Company/Company";
import { ProfileEdit } from "../ProfileEdit/ProfileEdit.js";
import { Sidebar } from "../Sidebar/Sidebar";
import { Topbar } from "../Topbar/Topbar";
import { UserMenu } from "../UserMenu";
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
    } else if (activeContent === "user") {
      if (userRole === "admin") {
        navigate("/user");
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
    } else if (activeContent === "addCompany") {
      navigate("/addCompany");
    } else if (activeContent.startsWith("editCompany")) {
      navigate(`/${activeContent}`);
    }
    fetchUserProfile();
  }, [activeContent, navigate]);

  const handleLinkClick = (content) => {
    setActiveContent(content);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleAddCompanySuccess = () => {
    setActiveContent("company");
    navigate("/company");
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
              <Category />
            )}
            {userRole === "admin" && activeContent === "user" && <UserMenu />}
            {userRole === "user" && activeContent === "company" && (
              <Company onLinkClick={handleLinkClick} />
            )}
            {activeContent === "about" && <About />}
            {activeContent === "profile" && (
              <ProfileEdit
                fetchUserProfile={fetchUserProfile}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
            {activeContent === "password" && <ChangePassword />}
            {activeContent === "addCompany" && (
              <AddCompany handleAddCompanySuccess={handleAddCompanySuccess} />
            )}
            {activeContent.startsWith("editCompany") && (
              <AddCompany
                handleAddCompanySuccess={handleAddCompanySuccess}
                editCompanyId={activeContent.split("/")[1]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
