import React, {useEffect, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import {MdDeleteForever} from "react-icons/md";

export default function Company({onLinkClick}) {
    const [companyData, setCompanyData] = useState([]);

    const token = localStorage.getItem("token");

    const fetchData = async () => {
        try {
            const response = await axios.get('http://192.168.29.12:3000/api/company', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setCompanyData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteCategory = async (category_id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );
        if (confirmDelete) {
            try {
                await fetch(`http://192.168.29.12:3000/api/company/${category_id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCompanyData((prevCompany) =>
                    prevCompany.filter((company) => company.id !== category_id)
                );
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    return (
        <>
            <button onClick={() => onLinkClick('addCompany')}>
                Add
            </button>
            <div>
                {companyData.map((company, index) => (
                    <div key={index}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                            >
                                <Typography variant={'h2'}>CompanyName : {company.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{display: 'flex', gap: 2}}>
                                <Typography variant={'h4'}>PhoneNumber : {company.phoneNumber}</Typography>
                                <img src={company.image} style={{width: '180px', height: '100px'}} alt={company.name}/>
                                <Typography variant={'h5'}>Email : {company.email}</Typography>
                                <Typography variant={'h5'}>Address : {company.address}</Typography>
                                <Typography variant={'h5'}>City : {company.city}</Typography>
                                <Typography variant={'h5'}>State : {company.state}</Typography>
                                <Typography variant={'h5'}>PinCode : {company.pinCode}</Typography>
                                <Typography variant={'h5'}>Instagram : {company.instagram}</Typography>
                                <Typography variant={'h5'}>LinkedIn : {company.linkedin}</Typography>
                                <Typography variant={'h5'}>Facebook : {company.facebook}</Typography>
                                <Typography variant={'h5'}>Twitter : {company.twitter}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <div>
                            <MdDeleteForever
                                type="button"
                                size={25}
                                className="mt-3 ms-3"
                                onClick={() => deleteCategory(company.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
