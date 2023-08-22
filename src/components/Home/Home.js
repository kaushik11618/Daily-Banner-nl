import React, { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Topbar } from "../Topbar/Topbar";
import { Festival } from "../Festival/Festival";
import { About } from "../About/About.js";
import "./Home.css";
export const Home = () => {
  const [activeContent, setActiveContent] = useState("home");

  const handleLinkClick = (content) => {
    setActiveContent(content);
  };
  return (
    <>
      <Topbar />
      <div className="sidebarlayout">
        <Sidebar onLinkClick={handleLinkClick} />
        {activeContent === "festival" && <Festival />}
        {activeContent === "about"&& <About/>}
      </div>
    </>
  );
};
