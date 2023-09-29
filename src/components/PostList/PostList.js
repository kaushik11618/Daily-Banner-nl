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
import {Avatar, Button, Checkbox, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import axios from "axios";
import Swal from "sweetalert2";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const PostList = ({onLinkClick}) => {

    const [userList, setUserList] = useState([])

    const token = localStorage.getItem("token");

    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://192.168.29.12:3000/api/post",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUserList(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const deleteUser = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to reverse this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: '#d55',
                confirmButtonText: 'Yes, delete it!',
            });
            if (result.isConfirmed) {
                await fetch(`http://192.168.29.12:3000/api/post/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserList((prevData) =>
                    prevData.filter((user) => user.id !== id)
                );
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
        console.log("hii", id);
    };

    return (
        <>
            <div className='mt-5'>
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: 20}}>
                        <Typography gutterBottom variant='h3' component='div'>
                            Post List
                        </Typography>
                        <Button variant="contained"
                                style={{width: "150px", height: "50px"}}
                                onClick={() => onLinkClick("add-post")}
                        >
                            Add
                        </Button>
                    </div>
                    <Divider/>

                    <Box height={10}/>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            id
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Category
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Sub Category
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Company
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Note
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Description
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Due Date
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Post Date
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Social Media
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Email
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Address
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Phone
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Post Plate-form
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Action
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userList
                                    .map((user, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1}>
                                                <TableCell key={user.id}>
                                                    <Typography variant='h5'>
                                                        {index + 1}
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
                                                                    key={platform}
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
                                                <TableCell align='left'>
                                                    <Stack spacing={2} direction='row'>
                                                        <DeleteIcon sx={{fontSize: '30px', color: 'red'}}
                                                                    onClick={() => deleteUser(user.id)}
                                                        />
                                                    </Stack>
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

export default PostList;


// import React, {useEffect, useState} from 'react';
// import {Box, Button, Checkbox, Chip} from "@mui/material";
// import {DataGrid} from "@mui/x-data-grid";
// import AddFile from "../../AddFile";
//
//
// const PostList = ({onLinkClick}) => {
//
//     const [userList, setUserList] = useState([])
//
//     const token = localStorage.getItem('token')
//
//     useEffect(() => {
//
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://192.168.29.12:3000/api/post', {
//                     method: 'GET',
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     },
//                 })
//                 const data = await response.json()
//                 setUserList(data)
//             } catch (error) {
//                 console.log()
//             }
//         }
//
//         fetchData()
//     }, [])
//
//     return (
//         <>
//             <AddFile/>
//             <div className='d-flex justify-content-end'>
//                 <Button variant="contained"
//                         style={{width: "150px", height: "50px", marginTop: '20px'}}
//                         onClick={() => onLinkClick("add-post")}
//                 >
//                     Add
//                 </Button>
//             </div>
//             <h1 className='text-center'>Post List</h1>
//             {userList.length > 0 && (
//                 <div>
//                     <DataGrid sx={{fontSize: '15px'}}
//                               rows={userList.map((user, index) => ({
//                                   ...user,
//                                   id: index + 1,
//                                   category: user.category.name,
//                                   subCategory: user.subCategory.name,
//                                   company: user.company.name,
//                               }))}
//                               columns={[
//                                   {field: 'id', headerName: 'Id', width: 50},
//                                   {field: 'category', headerName: 'Category', width: 100},
//                                   {field: 'subCategory', headerName: 'SubCategory', width: 120},
//                                   {field: 'company', headerName: 'Company', width: 110},
//                                   {field: 'note', headerName: 'Note', width: 100},
//                                   {field: 'description', headerName: 'Description', width: 160},
//                                   {field: 'ending_date', headerName: 'Due Date', width: 140},
//                                   {field: 'posting_date', headerName: 'Post Date', width: 130},
//                                   {
//                                       field: 'socialMedia',
//                                       headerName: 'Social Media',
//                                       width: 130,
//                                       renderCell: (params) => {
//                                           return (
//                                               <Checkbox sx={{position: 'relative', left: '20px'}}
//                                                         checked={parseInt(params.row.socialMedia) === 1}/>
//                                           )
//                                       }
//                                   },
//                                   {
//                                       field: 'email',
//                                       headerName: 'Email',
//                                       width: 90,
//                                       renderCell: (params) => {
//                                           return (
//                                               <Checkbox checked={parseInt(params.row.email) === 1}/>
//                                           )
//                                       }
//                                   },
//                                   {
//                                       field: 'address',
//                                       headerName: 'Address',
//                                       width: 100,
//                                       renderCell: (params) => {
//                                           return (
//                                               <Checkbox sx={{position: 'relative', left: '10px'}}
//                                                         checked={parseInt(params.row.address) === 1}/>
//                                           )
//                                       }
//                                   },
//                                   {
//                                       field: 'phoneNumber',
//                                       headerName: 'Phone',
//                                       width: 100,
//                                       renderCell: (params) => {
//                                           return (
//                                               <Checkbox sx={{position: 'relative', left: '10px'}}
//                                                         checked={parseInt(params.row.phoneNumber) === 1}/>
//                                           )
//                                       }
//                                   },
//                                   {
//                                       field: 'postPlatform',
//                                       headerName: 'Post Plate-form',
//                                       width: 250,
//                                       renderCell: (params) => {
//                                           console.log("params.row.postPlatform", params.row.postPlatform);
//                                           return (
//                                               <Box sx={{
//                                                   display: 'flex',
//                                                   gap: '8px',
//                                                   flexWrap: 'wrap',
//                                               }}>
//                                                   {params.row.postPlatform.map(platform => (
//                                                       <Chip label={platform} variant="outlined"/>
//                                                   ))}
//                                               </Box>
//                                           )
//                                       }
//                                   },
//                               ]}
//                               initialState={{
//                                   pagination: {
//                                       paginationModel: {page: 0, pageSize: 6},
//                                   },
//                               }}
//                               pageSizeOptions={[5, 10]}
//                     />
//                 </div>
//             )}
//         </>
//     );
// };
//
// export default PostList;
