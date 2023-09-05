import React, {useEffect, useState} from "react";
import "./Sidebar.css";
import {FaBars} from "react-icons/fa";
import {BiLogOut, BiSolidCategory} from "react-icons/bi";
import {FcDebian} from "react-icons/fc";
import {useNavigate} from "react-router";

export const Sidebar = ({ onLinkClick }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const token = localStorage.getItem("token");
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
        } catch (error) {
        }
    };

    return (
        <>
            <div style={{width: isOpen ? "280px" : "50px"}} className="sidebar ">
                <div className="top_section">
                    <h1 style={{display: isOpen ? "block" : "none"}} className="logo">
                        Dashboard
                    </h1>
                    <div style={{marginLeft: isOpen ? "30px" : "5px"}} className="bars">
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
                <h2 onClick={() => onLinkClick("category")} className="link">
                    &nbsp; <BiSolidCategory style={{fontSize: "30px"}}/>
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
                <h2 onClick={() => onLinkClick("about")} className="link">
                    &nbsp; <FcDebian style={{fontSize: "30px"}} className='ct'/>
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
                <h2>
                    &nbsp;{" "}
                    <BiLogOut style={{fontSize: "30px"}} className='ct' onClick={handleLogout}/>
                    <button
                        className='log'
                        style={{
                            display: isOpen ? "block" : "none",
                            marginInlineStart: "50px",
                            position: "relative",
                            bottom: "32px",
                            width: "80px",
                            backgroundColor: "blue",
                        }}
                        onClick={handleLogout}
                    >
                        logout
                    </button>
                </h2>
            </div>
        </>
    );
};