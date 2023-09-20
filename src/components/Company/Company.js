import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Switch } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

export default function Company({ onLinkClick }) {
  const [companyData, setCompanyData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      try {
        await fetch(`http://192.168.29.12:3000/api/company/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanyData((prevData) =>
          prevData.filter((company) => company.id !== id)
        );
      } catch (error) {
        console.error("Error deleting company:", error);
      }
    }
    console.log("hii", id);
  };
  const toggleDetails = async (company) => {
    const newStatus = company.status === "active" ? "inactive" : "active";
    const confirmationMessage = `Are you sure you want to ${
      newStatus === "active" ? "activate" : "inactivate"
    } "${company.name}"?`;
    const userConfirmed = window.confirm(confirmationMessage);
    if (userConfirmed) {
      try {
        await axios.post(
          `http://192.168.29.12:3000/api/company/status`,
          {
            id: company.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setShowDetails(!showDetails);
        fetchData()
      } catch (error) {
        console.error("Error updating company status:", error);
      }
    }
  };
  
  return (
    <>
      <div className="category-container">
        <h1 className="title mt-5">Company</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Button variant="contained"
            style={{ width: "150px", height: "50px" }}
            onClick={() => onLinkClick("addCompany")}
          >
            Add
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
          }}
        >
          {companyData.map((company, index) => (
            <div
              key={index}
              style={{ display: "flex", padding: "5px", marginTop: "10px" }}
            >
              <Accordion
                sx={{ width: "100%", border: "1px solid black" }}
                elevation={2}
                disabled={company.status === "inactive"}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    variant={"h2"}
                    color={"primary"}
                    fontWeight={"500"}
                  >
                    Company Name: {company.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    gap: 2,
                    flexDirection: "column",
                  }}
                >
                  <Typography variant={"h3"}>
                    Image :<br />
                    <img
                      src={company.image}
                      style={{ width: "180px", height: "100px" }}
                      alt={company.name}
                    />
                  </Typography>
                  <Typography variant={"h4"}>
                    PhoneNumber : {company.phoneNumber}
                  </Typography>
                  <Typography variant={"h5"}>
                    Email : {company.email}
                  </Typography>
                  <Typography variant={"h5"}>
                    Address : {company.address}
                  </Typography>
                  <Typography variant={"h5"}>City : {company.city}</Typography>
                  <Typography variant={"h5"}>
                    State : {company.state}
                  </Typography>
                  <Typography variant={"h5"}>
                    PinCode : {company.pinCode}
                  </Typography>
                  {company.instagram === "null" ? (
                    <></>
                  ) : (
                    <Typography variant={"h5"}>
                      Instagram: {company.instagram}
                    </Typography>
                  )}
                  {company.linkedin === "null" ? (
                    <></>
                  ) : (
                    <Typography variant={"h5"}>
                      LinkedIn: {company.linkedin}
                    </Typography>
                  )}
                  {company.facebook === "null" ? (
                    <></>
                  ) : (
                    <Typography variant={"h5"}>
                      Facebook: {company.facebook}
                    </Typography>
                  )}
                  {company.twitter === "null" ? (
                    <></>
                  ) : (
                    <Typography variant={"h5"}>
                      Twitter: {company.twitter}
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
              <div style={{ display: "flex" }}>
                <Switch
                  className="mt-3 ms-3"
                  checked={company.status === "active"}
                  onChange={() => toggleDetails(company)}
                />
                <MdEdit
                  className="mt-4 ms-3"
                  size={25}
                  onClick={() => editCompany(company.id)}
                />
                <MdDeleteForever
                  type="button"
                  size={25}
                  className="mt-4 ms-3"
                  onClick={() => deleteCompany(company.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
