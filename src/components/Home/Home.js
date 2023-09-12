import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {About} from "../About/About.js";
import {Category} from "../Category/Category";
import {Sidebar} from "../Sidebar/Sidebar";
import {ProfileEdit} from "../ProfileEdit/ProfileEdit.js";
import {Topbar} from "../Topbar/Topbar";
import "./Home.css";
import ChangePassword from "../ChangePassword/ChangePassword";

export const Home = () => {
  const navigate = useNavigate();
  const [activeContent, setActiveContent] = useState(window.location.pathname.replace("/", ""));

  useEffect(() => {
    if (
        localStorage.getItem("token") === "" ||
        localStorage.getItem("token") === null
    ) {
      navigate("/");
    } else {
      if (window.location.pathname === "/home") {
        setActiveContent("category");
      }
    }
  }, []);

  useEffect(() => {
    if (activeContent === "category") {
      navigate("/category");
    }
    if (activeContent === "about") {
      navigate("/about");
    }
    if (activeContent === "profile") {
      navigate("/profile");
    }
    if (activeContent === "password") {
      navigate("/password");
    }
  }, [activeContent]);

  const handleLinkClick = (content) => {
    setActiveContent(content);
  };

  return (
      <>
        <Topbar onLinkClick={handleLinkClick}/>
        <div className="sidebarlayout">
          <Sidebar onLinkClick={handleLinkClick}/>
          {activeContent === "category" && <Category/>}
          {activeContent === "about" && <About/>}
          {activeContent === "profile" && <ProfileEdit/>}
          {activeContent === "password" && <ChangePassword/>}
        </div>
      </>
  );
};
