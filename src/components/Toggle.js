import React, { useState } from 'react';
import {FormControlLabel, Switch} from "@mui/material";

function Toggle() {
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    const toggleInfo = () => {
        setIsInfoVisible(!isInfoVisible);
    };

    return (
        <div>
            <FormControlLabel control={<Switch defaultChecked />} onClick={toggleInfo} >
                {isInfoVisible ? 'Hide Info' : 'Show Info'}
            </FormControlLabel>
            {isInfoVisible && <div>This is the hidden information you can toggle.</div>}
        </div>
    );
}

export default Toggle;
