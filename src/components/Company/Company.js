import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Autocomplete, Button, Stack, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import axios from "axios";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import Swal from "sweetalert2";

const Company = ({onLinkClick}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [companyData, setCompanyData] = useState([]);

    const token = localStorage.getItem("token");

    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://192.168.29.12:3000/api/company",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCompanyData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const editCompany = (companyId) => {
        onLinkClick(`editCompany/${companyId}`);
    };
    const deleteCompany = async (id) => {
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
                await fetch(`http://192.168.29.12:3000/api/company/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCompanyData((prevData) =>
                    prevData.filter((company) => company.id !== id)
                );
            }
        } catch (error) {
            console.error("Error deleting company:", error);
        }
        console.log("hii", id);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filterData = (v) => {
        if (v) {
            setCompanyData([v])
        } else {
            setCompanyData([])
            fetchData()
        }
    }
    return (
        <>
            <div className='mt-5'>
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <Typography gutterBottom variant='h3' component='div' sx={{padding: '20px'}}>
                        Company
                    </Typography>
                    <Divider/>
                    <Box height={10}/>
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: 20}}>
                        <Stack dorection='row' spacing={2}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={companyData}
                                getOptionLabel={(companyData) => companyData.name || ''}
                                onChange={(e, v) => filterData(v)}
                                sx={{width: 300}}
                                renderInput={(params) => <TextField {...params} label="Search Products"/>}
                            />
                        </Stack>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row-reverse",
                            }}
                        >
                            <Button variant="contained"
                                    style={{width: "150px", height: "50px", fontSize: '20px'}}
                                    onClick={() => onLinkClick("addCompany")}
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                    <Box height={10}/>
                    <TableContainer sx={{maxHeight: 500}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Company Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Image
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Phone Number
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Address
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            City
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            State
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            PinCode
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='left' sx={{minWidth: '100px'}}>
                                        <Typography gutterBottom variant='h4' component='div'>
                                            Social Media
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
                                {companyData
                                    .map((company) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1}>
                                                <TableCell key={company.id}>
                                                    <Typography variant='h5'>
                                                        {company.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='left'>
                                                    <img
                                                        src={company.image}
                                                        style={{width: "80px", height: "80px"}}
                                                        alt={company.name}
                                                    />
                                                </TableCell>
                                                <TableCell align='left'>
                                                    <Typography variant='h5'>
                                                        {company.phoneNumber}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='left'>
                                                    <Typography variant='h5'>
                                                        {company.address}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='left'>
                                                    <Typography variant='h5'>
                                                        {company.city}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='left'>
                                                    <Typography variant='h5'>
                                                        {company.state}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='left'>
                                                    <Typography variant='h5' className='ms-3'>
                                                        {company.pinCode}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='left'>
                                                    <Typography variant='h5'>
                                                        <a href={company.linkedin} target="_blank"
                                                           rel="noopener noreferrer">
                                                            <LinkedInIcon sx={{fontSize: '35px'}}/>
                                                        </a>
                                                        <a href={company.instagram} target="_blank"
                                                           rel="noopener noreferrer">
                                                            <InstagramIcon sx={{fontSize: '35px', color: '#660e60'}}/>
                                                        </a><br/>
                                                        <a href={company.twitter} target="_blank"
                                                           rel="noopener noreferrer">
                                                            <TwitterIcon sx={{fontSize: '35px'}}/>
                                                        </a>
                                                        <a href={company.facebook} target="_blank"
                                                           rel="noopener noreferrer">
                                                            <FacebookIcon sx={{fontSize: '35px'}}/>
                                                        </a>
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='left'>
                                                    <Stack spacing={2} direction='row'>
                                                        <EditIcon sx={{fontSize: '30px', color: 'blue'}}
                                                                  onClick={() => editCompany(company.id)}
                                                        />
                                                        <DeleteIcon sx={{fontSize: '30px', color: 'red'}}
                                                                    onClick={() => deleteCompany(company.id)}
                                                        />
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={companyData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </>
    );
};

export default Company;


// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import {Button, Switch} from "@mui/material";
// import Accordion from "@mui/material/Accordion";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import Typography from "@mui/material/Typography";
// import axios from "axios";
// import React, {useEffect, useState} from "react";
// import {MdDeleteForever, MdEdit} from "react-icons/md";
// import File from "../File";
//
// export default function Company({onLinkClick}) {
//   const [companyData, setCompanyData] = useState([]);
//   const [showDetails, setShowDetails] = useState(false);
//
//   const token = localStorage.getItem("token");
//
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//           "http://192.168.29.12:3000/api/company",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//       );
//       setCompanyData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);
//
//   const editCompany = (companyId) => {
//     onLinkClick(`editCompany/${companyId}`);
//   };
//
//   const deleteCompany = async (id) => {
//     const confirmDelete = window.confirm(
//         "Are you sure you want to delete this category?"
//     );
//     if (confirmDelete) {
//       try {
//         await fetch(`http://192.168.29.12:3000/api/company/${id}`, {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCompanyData((prevData) =>
//             prevData.filter((company) => company.id !== id)
//         );
//       } catch (error) {
//         console.error("Error deleting company:", error);
//       }
//     }
//     console.log("hii", id);
//   };
//   const toggleDetails = async (company) => {
//     const newStatus = company.status === "active" ? "inactive" : "active";
//     const confirmationMessage = `Are you sure you want to ${
//         newStatus === "active" ? "activate" : "inactivate"
//     } "${company.name}"?`;
//     const userConfirmed = window.confirm(confirmationMessage);
//     if (userConfirmed) {
//       try {
//         await axios.post(
//             `http://192.168.29.12:3000/api/company/status`,
//             {
//               id: company.id,
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//         );
//         setShowDetails(!showDetails);
//         fetchData()
//       } catch (error) {
//         console.error("Error updating company status:", error);
//       }
//     }
//   };
//
//   return (
//       <>
//         <File/>
//         <div className="category-container">
//           <h1 className="title mt-5">Company</h1>
//           <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row-reverse",
//               }}
//           >
//             <Button variant="contained"
//                     style={{width: "150px", height: "50px"}}
//                     onClick={() => onLinkClick("addCompany")}
//             >
//               Add
//             </Button>
//           </div>
//           <div
//               style={{
//                 display: "flex",
//                 width: "100%",
//                 flexDirection: "column",
//               }}
//           >
//             {companyData.map((company, index) => (
//                 <div
//                     key={index}
//                     style={{display: "flex", marginTop: "10px"}}
//                 >
//                   <Accordion
//                       sx={{width: "100%", border: "1px solid black"}}
//                       elevation={2}
//                       disabled={company.status === "inactive"}
//                   >
//                     <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
//                       <Typography
//                           variant={"h2"}
//                           color={"primary"}
//                           fontWeight={"500"}
//                       >
//                         Company Name: {company.name}
//                       </Typography>
//                     </AccordionSummary>
//                     <AccordionDetails
//                         sx={{
//                           gap: 2,
//                           flexDirection: "column",
//                         }}
//                     >
//                       <Typography variant={"h3"}>
//                         Image :<br/>
//                         <img
//                             src={company.image}
//                             style={{width: "180px", height: "100px"}}
//                             alt={company.name}
//                         />
//                       </Typography>
//                       <Typography variant={"h4"}>
//                         PhoneNumber : {company.phoneNumber}
//                       </Typography>
//                       <Typography variant={"h5"}>
//                         Email : {company.email}
//                       </Typography>
//                       <Typography variant={"h5"}>
//                         Address : {company.address}
//                       </Typography>
//                       <Typography variant={"h5"}>City : {company.city}</Typography>
//                       <Typography variant={"h5"}>
//                         State : {company.state}
//                       </Typography>
//                       <Typography variant={"h5"}>
//                         PinCode : {company.pinCode}
//                       </Typography>
//                       {company.instagram === "null" ? (
//                           <></>
//                       ) : (
//                           <Typography variant={"h5"}>
//                             Instagram: {company.instagram}
//                           </Typography>
//                       )}
//                       {company.linkedin === "null" ? (
//                           <></>
//                       ) : (
//                           <Typography variant={"h5"}>
//                             LinkedIn: {company.linkedin}
//                           </Typography>
//                       )}
//                       {company.facebook === "null" ? (
//                           <></>
//                       ) : (
//                           <Typography variant={"h5"}>
//                             Facebook: {company.facebook}
//                           </Typography>
//                       )}
//                       {company.twitter === "null" ? (
//                           <></>
//                       ) : (
//                           <Typography variant={"h5"}>
//                             Twitter: {company.twitter}
//                           </Typography>
//                       )}
//                     </AccordionDetails>
//                   </Accordion>
//                   <div style={{display: "flex"}}>
//                     <Switch
//                         className="mt-3 ms-3"
//                         checked={company.status === "active"}
//                         onChange={() => toggleDetails(company)}
//                     />
//                     <MdEdit
//                         className="mt-4 ms-3"
//                         size={25}
//                         onClick={() => editCompany(company.id)}
//                     />
//                     <MdDeleteForever
//                         type="button"
//                         size={25}
//                         className="mt-4 ms-3"
//                         onClick={() => deleteCompany(company.id)}
//                     />
//                   </div>
//                 </div>
//             ))}
//           </div>
//         </div>
//       </>
//   );
// }