import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Avatar, Checkbox, FormControl, Select} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {toast} from "react-toastify";
import InfoIcon from "@mui/icons-material/Info";

const Post = ({onLinkClick}) => {

    const [user, setUser] = useState([])
    const [options, setOptions] = useState([])
    const [selectedValue, setSelectedValue] = useState([])
    const [selected, setSelected] = useState([])


    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://192.168.29.12:3000/api/admin/post",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };


        const showRequest = async () => {
            try {
                const request = await axios.get("http://192.168.29.12:3000/api/admin/request", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setOptions(request.data)
            } catch (error) {
                console.log('Error getting request', error)
            }
        }

        fetchData();
        showRequest()
    }, []);


    const handleChange = async (userId, event) => {
        event.preventDefault()
        const postStatus = parseInt(event.target.value);
        setSelected(event.target.value);
        setSelectedValue((prevSelectedValues) => ({
            ...prevSelectedValues,
            [user.id]: postStatus,
        }));


        const updateStatus = {
            id: userId,
            requestStatus: postStatus
        }

        let confirmationMessage = 'Are you sure you want to'
        const userConfirmed = window.confirm(confirmationMessage);

        if (userConfirmed) {
            const response = await fetch('http://192.168.29.12:3000/api/admin/request-status-change', {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updateStatus)
            })
            if (response.ok) {
                const apiMessage = await response.json();
                toast.success(apiMessage.message);
            } else {
                const errorMessage = await response.json();
                toast.error(errorMessage.message);
            }
        }

    }

    const postId = (id) => {
        onLinkClick(`details/${id}`)
    }

    return (
        <>
            <div className='mt-5'>
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <Typography gutterBottom variant='h3' component='div' padding={2}
                                sx={{background: 'gray', color: 'white'}}>
                        Post List
                    </Typography>
                    <Divider/>
                    <Box height={10}/>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left' sx={{minWidth: '50px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            id
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Full Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '50px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            For More Details
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user.map((user, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell key={user.id}>
                                                <Typography variant='h5'>
                                                    {index + 1}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Typography variant='h5'>
                                                    {user.user.first_name + ' ' + user.user.last_name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Typography variant='h5'>
                                                    <h5 onClick={() => postId(user.id)}> Click for Details &nbsp;
                                                        <InfoIcon/>
                                                    </h5>
                                                    <FormControl sx={{m: 1, marginTop: 2}}>
                                                        {user.post_status && (user.post_status.name === 'Verified' || user.post_status.name === 'Completed') ? <></> :
                                                            <Select
                                                                native
                                                                value={selectedValue[user.id]}
                                                                onChange={(event) => handleChange(user.id, event)}
                                                                id="grouped-native-select"
                                                            >
                                                                {options.map((option) => (
                                                                    <option key={option.id} value={option.id}
                                                                            selected={user.post_status.id === option.id}
                                                                            disabled={option.id === 6 || option.id === 5}>
                                                                        {option.name}
                                                                    </option>
                                                                ))}
                                                            </Select>
                                                        }
                                                    </FormControl>
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </>
    );
};

export default Post;