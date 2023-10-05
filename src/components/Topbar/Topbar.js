import React, { useEffect, useState } from "react";
import { ProfilePopup } from "../ProfilePopup/ProfilePopup";
import DehazeIcon from "@mui/icons-material/Dehaze";

export const Topbar = ({ onLinkClick, currentUser, toggleSidebar, isOpen }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        toggleSidebar();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="bg-dark">
        <div
          style={{
            marginLeft: isOpen ? "30px" : "0px",
            cursor: "pointer",
            position: "relative",
            top: "15px",
          }}
        >
          <DehazeIcon
            className="ms-5"
            sx={{ fontSize: "35px", color: "white" }}
            onClick={toggleSidebar}
          />
        </div>
        <div
          style={{
            color: "white",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            style={{
              border: "1px solid white",
              borderRadius: "50px",
              width: "150px",
              backgroundColor: "transparent",
              color: "white",
              cursor: "pointer",
              position: "relative",
              bottom: 15,
            }}
            onClick={displayPopup}
          >
            {currentUser ? `Welcome, ${currentUser.first_name}` : "Loading..."}
          </button>
        </div>
        {popupVisible ? (
          <div
            style={{
              position: "absolute",
              top: "60px",
              right: "0",
              zIndex: 999,
            }}
          >
            <ProfilePopup
              currentUser={currentUser}
              onLinkClick={onLinkClick}
              onClose={() => setPopupVisible(false)}
            />
          </div>
        ) : (
          <></>
        )}
      </nav>
    </>
  );
};
