import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import axios from "axios";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import Swal from "sweetalert2";

const Company = ({ onLinkClick }) => {
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
        title: "Are you sure?",
        text: "You won't be able to reverse this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d55",
        confirmButtonText: "Yes, delete it!",
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
      setCompanyData([v]);
    } else {
      setCompanyData([]);
      fetchData();
    }
  };
  return (
    <>
      <div className="mt-5">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            sx={{ padding: "20px" }}
          >
            Company
          </Typography>
          <Divider />
          <Box height={10} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 20,
            }}
          >
            <Stack dorection="row" spacing={2}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={companyData}
                getOptionLabel={(companyData) => companyData.name || ""}
                onChange={(e, v) => filterData(v)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Search Products" />
                )}
              />
            </Stack>
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <Button
                variant="contained"
                style={{ width: "150px", height: "50px", fontSize: "20px" }}
                onClick={() => onLinkClick("addCompany")}
              >
                Add
              </Button>
            </div>
          </div>
          <Box height={10} />
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                      Company Name
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                      Image
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                      Phone Number
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                      Address
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                      City
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                      State
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                      PinCode
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                      Social Media
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companyData.map((company) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell key={company.id}>
                        <Typography variant="h5">{company.name}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <img
                          src={company.image}
                          style={{ width: "80px", height: "80px" }}
                          alt={company.name}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h5">
                          {company.phoneNumber}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h5">{company.address}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h5">{company.city}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h5">{company.state}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h5" className="ms-3">
                          {company.pinCode}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h5">
                          <a
                            href={`https://www.linkedin.com/${company.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <LinkedInIcon sx={{ fontSize: "35px" }} />
                          </a>
                          <a
                            href={`https://www.instagram.com/${company.instagram}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <InstagramIcon
                              sx={{ fontSize: "35px", color: "#660e60" }}
                            />
                          </a>
                          <br />
                          <a
                            href={`http://www.twitter.com/${company.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <TwitterIcon sx={{ fontSize: "35px" }} />
                          </a>
                          <a
                            href={`http://www.facebook.com/${company.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FacebookIcon sx={{ fontSize: "35px" }} />
                          </a>
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Stack spacing={2} direction="row">
                          <EditIcon
                            sx={{ fontSize: "30px", color: "blue" }}
                            onClick={() => editCompany(company.id)}
                          />
                          <DeleteIcon
                            sx={{ fontSize: "30px", color: "red" }}
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
