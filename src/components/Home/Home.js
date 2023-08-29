import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { About } from "../About/About.js";
import { Category } from "../Category/Category";
import { Sidebar } from "../Sidebar/Sidebar";
import { Topbar } from "../Topbar/Topbar";
import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();
  const [activeContent, setActiveContent] = useState("category");

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
  }, [activeContent]);

  const handleLinkClick = (content) => {
    setActiveContent(content);
  };

  return (
    <>
      <Topbar />
      <div className="sidebarlayout">
        <Sidebar onLinkClick={handleLinkClick} />
        {activeContent === "category" && <Category />}
        {activeContent === "about" && <About />}
      </div>
    </>
  );
};
