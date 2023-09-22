import React, {useEffect, useState} from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Switch} from "@mui/material";

const UserMenu = () => {
  const [userData, setUserData] = useState([]);
  const [showData, setShowData] = useState();
  const token = localStorage.getItem("token");
  console.log(userData);
  const fetchData = async () => {
    try {
      const response = await axios.get(
          "http://localhost:3000/api/admin/users",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      setUserData(response.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleDetails = async (user) => {
    user.status = user.status === "active" ? "inactive" : "active";

    try {
      await axios.post(
          "http://localhost:3000/api/admin/users",
          {
            id: user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      setShowData(!showData);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <>
      {userData.map((user, index) => (
        <div
          key={index}
          style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}
        >
          <Accordion
            elevation={2}
            disabled={user.status === "inactive"}
            style={{ width: "100%", gap: "20px" }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant={"h3"} color={"primary"} fontWeight={"500"}>
                Name: {user.slug}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                gap: 2,
                flexDirection: "column",
                border: "1px solid black",
              }}
            >
              <Typography variant={"h5"}>
                First Name: {user.first_name}
              </Typography>
              <Typography variant={"h5"}>
                Last Name : {user.last_name}
              </Typography>
              <Typography variant={"h5"}>
                Phone Number : {user.phoneNumber}
              </Typography>
              <Typography variant={"h5"}>Email : {user.email}</Typography>
              <Typography variant={"h5"}>Address : {user.address}</Typography>
              <Typography variant={"h5"}>
                Company Name : {user.company_name}
              </Typography>
              {user.instagram === "null" ? (
                <></>
              ) : (
                <Typography variant={"h5"}>
                  Instagram: {user.instagram}
                </Typography>
              )}
              {user.linkedin === "null" ? (
                <></>
              ) : (
                <Typography variant={"h5"}>
                  LinkedIn: {user.linkedin}
                </Typography>
              )}
              {user.facebook === "null" ? (
                <></>
              ) : (
                <Typography variant={"h5"}>
                  Facebook: {user.facebook}
                </Typography>
              )}
              {user.twitter === "" ? (
                <></>
              ) : (
                <Typography variant={"h5"}>Twitter: {user.twitter}</Typography>
              )}
            </AccordionDetails>
          </Accordion>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Switch
              checked={user.status === "active"}
              onClick={() => toggleDetails(user)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default UserMenu;
