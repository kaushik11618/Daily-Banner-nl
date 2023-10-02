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

const Post = () => {

    const [user, setUser] = useState([])
    const [options, setOptions] = useState([])
    const [selectedValue, setSelectedValue] = useState('')
    const [selected, setSelected] = useState([])
    const [selectedValues, setSelectedValues] = useState('');


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

        const selectRequest = async () => {
            try {
                const response = await axios.patch('http://192.168.29.12:3000/api/admin/request', {
                    header: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setSelectedValue(response.data)
            } catch (error) {
                console.log()
            }
        }


        fetchData();
        showRequest()
        selectRequest()
    }, []);


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
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Category
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Sub Category
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Company
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Note
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Description
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Due Date
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Post Date
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Social Media
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Email
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Address
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '50px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Phone
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '50px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Post Plate-form
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '50px'}}>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Field
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
                                                    {user.category.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Typography variant='h5'>
                                                    {user.sub_category.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Typography variant='h5'>
                                                    {user.company.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Typography variant='h5'>
                                                    {user.note}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Typography variant='h5' className='ms-3'>
                                                    {user.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Typography variant='h5' className='ms-3'>
                                                    {user.ending_date}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Typography variant='h5' className='ms-3'>
                                                    {user.posting_date}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Typography variant='h5' className='ms-3'>
                                                    <Checkbox checked={parseInt(user.social_media) === 1}/>
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Typography variant='h5' className='ms-3'>
                                                    <Checkbox checked={parseInt(user.email) === 1}/>
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Typography variant='h5' className='ms-3'>
                                                    <Checkbox checked={parseInt(user.address) === 1}/>
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Typography variant='h5' className='ms-3'>
                                                    <Checkbox checked={parseInt(user.phone_number) === 1}/>
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Typography variant='h5'>
                                                    <Box sx={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                                                        {user.post_platform.map(platform => (
                                                            <Avatar
                                                                label={platform}
                                                                variant="outlined"
                                                                key={platform} sx={{width: '35px', height: '35px',}}
                                                            >
                                                                {platform === 'facebook' ? (
                                                                    <Avatar>
                                                                        <FacebookIcon/>
                                                                    </Avatar>
                                                                ) : platform === 'twitter' ? (
                                                                    <Avatar>
                                                                        <TwitterIcon/>
                                                                    </Avatar>
                                                                ) : platform === 'instagram' ? (
                                                                    <Avatar>
                                                                        <InstagramIcon/>
                                                                    </Avatar>
                                                                ) : platform === 'linkedIn' ? (
                                                                    <Avatar>
                                                                        <LinkedInIcon/>
                                                                    </Avatar>
                                                                ) : platform === 'whatsapp' ? (
                                                                    <Avatar>
                                                                        <WhatsAppIcon/>
                                                                    </Avatar>
                                                                ) : null}
                                                            </Avatar>
                                                        ))}
                                                    </Box>
                                                </Typography>
                                            </TableCell>
                                            <FormControl sx={{m: 1, minWidth: 100, marginTop: 2}}>
                                                <Select
                                                    native
                                                    value={selectedValue[user.id] || ''}
                                                    onChange={(event) => {
                                                        const newValue = event.target.value;
                                                        setSelected(event.target.value);
                                                        setSelectedValue((prevSelectedValues) => ({
                                                            ...prevSelectedValues,
                                                            [user.id]: newValue,
                                                        }));
                                                    }}
                                                    id="grouped-native-select"
                                                >
                                                    {options.map((option) => (
                                                        <option key={option.id} value={option.id}>
                                                            {option.name}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </FormControl>
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