import React, {useState} from 'react';
import {FormControlLabel, Switch} from "@mui/material";

function Toggle({categoryStatus}) {
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const checked = categoryStatus === 'active' ? true : false

    const toggleInfo = async (e) => {
        e.preventDefault()
        setIsInfoVisible(!isInfoVisible);

        try {
            const response = await fetch('http://192.168.29.12:3000/api/category/status', {
                method: 'POST',
            })
        } catch (error) {

        }
    }

    return (
        <div>
            <FormControlLabel control={<Switch checked={checked}/>}
                              onClick={toggleInfo}
                              style={{position: 'relative', right: '50px'}}
            >

                {isInfoVisible ? 'Hide Info' : 'Show Info'}
            </FormControlLabel>
            {isInfoVisible && <div>This is the hidden information.</div>}
        </div>
    );
}

export default Toggle;
