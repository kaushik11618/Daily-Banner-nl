import React from 'react';
import {Accordion, AccordionSummary, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const PostList = ({onLinkClick}) => {


    return (
        <>
            <Button variant="contained"
                    style={{width: "150px", height: "50px"}}
                    onClick={() => onLinkClick("add-post")}
            >
                Add
            </Button>

            <Accordion
                sx={{width: "100%", border: "1px solid black"}}
                elevation={2}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography
                        variant={"h2"}
                        color={"primary"}
                        fontWeight={"500"}
                    >
                    </Typography>
                </AccordionSummary>
            </Accordion>
        </>
    );
};

export default PostList;