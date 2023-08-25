import React, {useState} from "react";
import "./Sidebar.css";
import {FaBars} from "react-icons/fa";
import {MdOutlineFestival} from "react-icons/md";
import {FcDebian} from "react-icons/fc";
import {BiLogOut} from "react-icons/bi";
import {useNavigate} from "react-router";

export const Sidebar = ({onLinkClick}) => {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    const token = localStorage.getItem('token')
    console.log(token)
    const handleLogout = async () => {

        try {
            const response = await fetch('http://192.168.29.12:3000/api/auth/logout', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            if (response.ok) {
                localStorage.removeItem('token');
                navigate('/');
            }
        } catch (error) {

        }
    };

    return (
        <>
            <div style={{width: isOpen ? "300px" : "50px"}} className="sidebar">
                <div className="top_section">
                    <h1 style={{display: isOpen ? "block" : "none"}} className="logo">
                        Dashboard
                    </h1>
                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
                <h2 onClick={() => onLinkClick("festival")} className='link'>
                    &nbsp; <MdOutlineFestival style={{fontSize: "30px"}}/>
                    <strong
                        style={{
                            display: isOpen ? "block" : "none",
                            marginInlineStart: '50px',
                            position: 'relative',
                            bottom: '25px'
                        }}
                    >Festival
                    </strong>
                </h2>
                <h2 onClick={() => onLinkClick("about")} className='link'>
                    &nbsp; <FcDebian style={{fontSize: "30px"}}/>
                    <strong
                        style={{
                            display: isOpen ? "block" : "none",
                            marginInlineStart: '50px',
                            position: 'relative',
                            bottom: '25px'
                        }}
                    >
                        About
                    </strong>
                </h2>
                <h2>
                    &nbsp; <BiLogOut style={{fontSize: "30px"}}/>
                    <button
                        style={{
                            display: isOpen ? "block" : "none",
                            marginInlineStart: '50px',
                            position: 'relative',
                            bottom: '32px',
                            width: '80px',
                            backgroundColor: 'blue'
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
