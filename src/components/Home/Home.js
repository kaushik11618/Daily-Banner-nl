import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { About } from "../About/About.js";
import { Category } from "../Category/Category";
import ChangePassword from "../ChangePassword/ChangePassword";
import { ProfileEdit } from "../ProfileEdit/ProfileEdit.js";
import { Sidebar } from "../Sidebar/Sidebar";
import { Topbar } from "../Topbar/Topbar";
import "./Home.css";
import Company from "../Company/Company";
import AddCompany from "../Company/AddCompany";
import UserMenu from "../UserMenu";
import PostList from "../PostList/PostList";
import { AddPost } from "../PostList/AddPost";
import Post from "../AdminPost/Post";
import Details from "../AdminPost/Details";
import { PostDetails } from "../PostList/PostDetails.js";

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
    } else if (activeContent === "post") {
      if (userRole === "admin") {
        navigate("/post");
      }
    } else if (activeContent === "company") {
      if (userRole === "user") {
        navigate("/company");
      }
    } else if (activeContent === "post-list") {
      if (userRole === "user") {
        navigate("/post-list");
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
    } else if (activeContent === "add-post") {
      navigate("/add-post");
    } else if (activeContent.startsWith("post-details")) {
      navigate(`/${activeContent}`);
    } else if (activeContent.startsWith("post-edit")) {
      navigate(`/${activeContent}`);
    } else if (activeContent.startsWith("details")) {
      navigate(`/${activeContent}`);
    } else if (activeContent === "post") {
      navigate("/post");
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

  const handleAddPost = () => {
    setActiveContent("post-list");
    navigate("/post-list");
  };

  return (
    <>
      <div className="fixed-container">
        <div className="topbar">
          <Topbar
            onLinkClick={handleLinkClick}
            currentUser={currentUser}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div className="sidebarlayout">
          <Sidebar onLinkClick={handleLinkClick} isOpen={isOpen} />
          <div
            className="content-wrapper"
            style={{ marginLeft: isOpen ? "280px" : "30px", height: "100vh" }}
          >
            {userRole === "admin" && activeContent === "category" && (
              <Category />
            )}
            {userRole === "admin" && activeContent === "post" && (
              <Post onLinkClick={handleLinkClick} />
            )}
            {userRole === "admin" && activeContent === "user" && <UserMenu />}
            {activeContent.startsWith("details") && (
              <Details postId={activeContent.split("/")[1]} />
            )}
            {userRole === "user" && activeContent === "company" && (
              <Company onLinkClick={handleLinkClick} />
            )}{" "}
            {userRole === "user" && activeContent === "post-list" && (
              <PostList onLinkClick={handleLinkClick} />
            )}{" "}
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
            {userRole === "user" && activeContent.startsWith("post-edit") && (
              <AddPost
                handleAddPost={handleAddPost}
                editPostId={activeContent.split("/")[1]}
              />
            )}
            {userRole === "user" &&
              activeContent.startsWith("post-details") && (
                <PostDetails postUserId={activeContent.split("/")[1]} />
              )}
          </div>
        </div>
      </div>
    </>
  );
};
