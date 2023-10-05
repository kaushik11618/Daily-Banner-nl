import React, {useState} from "react";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import "./Register.css";

export const Register = () => {
    const navigate = useNavigate("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phonenumber, setPhonenumber] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestData = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: confirmPassword,
            address: address,
            phoneNumber: parseInt(phonenumber),
        };

        console.log(requestData, 'hi')
        if (password === confirmPassword) {
            try {
                const response = await fetch(
                    "http://192.168.29.12:3000/api/auth/register",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(requestData),
                    }
                );
                if (response.ok) {
                    const data = await response.json();

                    if (data.message) {
                        toast.success(data.message);
                        navigate("/");
                    } else {
                        toast.error("Registration failed. Please check your data.");
                    }
                } else {
                }
            } catch (err) {
                toast.error("An error occurred during registration.");
            }
        } else {
            toast.error('password and confirm password does not match')
        }

    };

    const handlePassword = (e) => {
        const {name, value} = e.target
        switch (name) {
            case 'password':
                setPassword(value)
                break
            case 'confirm password':
                setConfirmPassword(value)
                break
            default:
                break
        }
    }

    return (
        <>
            <div className="register">
                <div className="register-container">
                    <div className="register-title">Registration</div>
                    <div className="content">
                        <form className="register-form" onSubmit={handleSubmit}>
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">First Name</span>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <span className="details">Last Name</span>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <span className="details">Password</span>
                                    <input
                                        type="password"
                                        name='password'
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePassword}
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <span className="details">Confirm Password</span>
                                    <input
                                        type="password"
                                        name='confirm password'
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={handlePassword}
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <span className="details">Phone Number</span>
                                    <input
                                        type="number"
                                        placeholder="Phone Number"
                                        value={phonenumber}
                                        onChange={(e) => setPhonenumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <span className="details">Address</span>
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="register-btn">
                                <input type="submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
