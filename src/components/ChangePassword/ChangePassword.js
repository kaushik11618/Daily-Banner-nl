import React, {useState} from 'react';
import './ChangePassword.css';

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const token = localStorage.getItem("token");

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        switch (name) {
            case 'current_password':
                setCurrentPassword(value);
                break;
            case 'new_password':
                setNewPassword(value);
                break;
            case 'confirm_password':
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    };

    const handlePasswordChange = () => {
        const requestBody = {
            current_password: currentPassword,
            new_password: newPassword || confirmPassword
        };

        fetch('http://192.168.29.12:3000/api/auth/change-password', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Password changed successfully');
                } else {
                    console.error('Failed to change password');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        console.log(requestBody)
    };

    return (
        <div className="container p-5 text-center mt-5">
            <h1>Enter Your Password</h1>
            <input
                type="password"
                placeholder="Current Password"
                name="current_password"
                className="p-3 w-25 mt-5"
                value={currentPassword}
                onChange={handleInputChange}
            />
            <br/>
            <input
                type="password"
                placeholder="New Password"
                name="new_password"
                className="p-3 w-25 mt-5"
                value={newPassword}
                onChange={handleInputChange}
            />
            <br/>
            <input
                type="password"
                placeholder="Confirm Password"
                name="confirm_password"
                className="p-3 w-25 mt-5"
                value={confirmPassword}
                onChange={handleInputChange}
            />
            <br/>
            <button className="btn btn-primary" onClick={handlePasswordChange}>
                Save
            </button>
        </div>
    );
};

export default ChangePassword;