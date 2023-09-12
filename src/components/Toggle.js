import React, {useState} from "react";
import {FormControlLabel, Switch} from "@mui/material";

function Toggle({categoryStatus, categoryId, ontoggle}) {
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const checked = categoryStatus === "active" ? true : false;
    const check = categoryStatus === "active" ? false : true;

    const toggleInfo = async (e) => {
        e.preventDefault();
        setIsInfoVisible(!isInfoVisible);
        const token = localStorage.getItem("token");

        const Active = window.confirm("Are You Sure Active")
        if (Active) {
            try {
                await fetch("http://192.168.29.12:3000/api/category/status", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        id: categoryId,
                    }),
                });
                if (typeof ontoggle === "function") {
                    ontoggle();
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }

        const InActive = window.confirm("Are You Sure InActive")
        if (InActive) {
            try {
                await fetch("http://192.168.29.12:3000/api/category/status", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        id: categoryId,
                    }),
                });
                if (typeof ontoggle === "function") {
                    ontoggle();
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    return (
        <>
            <div>
                <FormControlLabel
                    control={<Switch checked={checked} checke={check}/>}
                    onClick={toggleInfo}
                    className='ms-5 mt-1'
                >
                    {isInfoVisible ? "Hide Info" : "Show Info"}

                </FormControlLabel>
            </div>
        </>
    )

}

export default Toggle;
