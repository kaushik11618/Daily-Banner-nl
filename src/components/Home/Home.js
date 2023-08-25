import React, { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import {Topbar}  from "../Topbar/Topbar";
import { Category } from "../Category/Category";
import { About } from "../About/About.js";
import "./Home.css";
import { useNavigate } from "react-router";
export const Home = () => {
  const navigate = useNavigate();
  const [activeContent, setActiveContent] = useState("home");
  useEffect(() => {
    if (
      localStorage.getItem("token") == "" ||
      localStorage.getItem("token") == null
    ) {
      navigate("/");
    }
  }, []);
  const handleLinkClick = (content) => {
    setActiveContent(content);
  };
  return (
    <>
      <Topbar />
      <div className="sidebarlayout">
        <Sidebar onLinkClick={handleLinkClick} />
        {activeContent === "festival" && <Category />}
        {activeContent === "about" && <About />}
      </div>
    </>
  );
};
