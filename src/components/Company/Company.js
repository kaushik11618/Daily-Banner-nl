import React, {useEffect, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import {MdDeleteForever, MdEdit} from 'react-icons/md';
import {Switch} from '@mui/material';

export default function Company({onLinkClick}) {
    const [companyData, setCompanyData] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [openDetailsId, setOpenDetailsId] = useState(null);

    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            const response = await axios.get('http://192.168.29.12:3000/api/company', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCompanyData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const editCompany = (companyId) => {
        onLinkClick(`editCompany/${companyId}`)
    }

    const deleteCompany = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this category?');
        if (confirmDelete) {
            try {
                await fetch(`http://192.168.29.12:3000/api/company/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCompanyData((prevData) => prevData.filter((company) => company.id !== id));
            } catch (error) {
                console.error('Error deleting company:', error);
            }
        }
        console.log('hii', id);
    };

    const toggleDetails = async (id) => {

        setOpenDetailsId((prevId) => (prevId === id ? null : id));

        try {
            await axios.post(`http://192.168.29.12:3000/api/company/status`, {
                id,
                showDetails: !showDetails,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowDetails(!showDetails);
        } catch (error) {
            console.error('Error updating company status:', error);
        }
    };

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'end', padding: '15px'}}>
                <button
                    style={{width: '150px', height: '50px'}}
                    onClick={() => onLinkClick('addCompany')}
                >
                    Add
                </button>
            </div>
            <div>
                {companyData.map((company, index) => (
                    <div key={index}>
                        <Accordion elevation={2}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography variant={'h2'} color={'primary'} fontWeight={'500'}>
                                    CompanyName: {company.name}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    display: showDetails ? 'flex' : 'none',
                                    gap: 2,
                                    flexDirection: 'column',
                                    border: '1px solid black',
                                }}
                            >
                                <Typography variant={'h3'}>Image :<br/>
                                    <img
                                        src={company.image}
                                        style={{width: '180px', height: '100px'}}
                                        alt={company.name}
                                    />
                                </Typography>
                                <Typography variant={'h4'}>PhoneNumber : {company.phoneNumber}</Typography>
                                <Typography variant={'h5'}>Email : {company.email}</Typography>
                                <Typography variant={'h5'}>Address : {company.address}</Typography>
                                <Typography variant={'h5'}>City : {company.city}</Typography>
                                <Typography variant={'h5'}>State : {company.state}</Typography>
                                <Typography variant={'h5'}>PinCode : {company.pinCode}</Typography>
                                {company.instagram === 'null' ? (
                                    <></>
                                ) : (
                                    <Typography variant={'h5'}>Instagram: {company.instagram}</Typography>
                                )}
                                {company.linkedin === 'null' ? (
                                    <></>
                                ) : (
                                    <Typography variant={'h5'}>LinkedIn: {company.linkedin}</Typography>
                                )}
                                {company.facebook === 'null' ? (
                                    <></>
                                ) : (
                                    <Typography variant={'h5'}>Facebook: {company.facebook}</Typography>
                                )}
                                {company.twitter === 'null' ? (
                                    <></>
                                ) : (
                                    <Typography variant={'h5'}>Twitter: {company.twitter}</Typography>
                                )}
                            </AccordionDetails>
                        </Accordion>
                        <div>
                            <Switch
                                // checked={showDetails}
                                checked={openDetailsId === company.id}
                                onChange={() => toggleDetails(company.id)}
                            />
                            <MdEdit size={20}
                                    onClick={() => editCompany(company.id)}
                            />
                            <MdDeleteForever
                                type='button'
                                size={25}
                                className='mt-3 ms-3'
                                onClick={() => deleteCompany(company.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
