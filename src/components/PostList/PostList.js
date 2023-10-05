import { Details } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const PostList = ({ onLinkClick }) => {
  const [userList, setUserList] = useState([]);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.29.12:3000/api/post", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserList(data);
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
        title: "Are you sure?",
        text: "You won't be able to reverse this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d55",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await fetch(`http://192.168.29.12:3000/api/post/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserList((prevData) => prevData.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    console.log("hii", id);
  };
  const UserPostDetail = (userId) => {
    onLinkClick(`post-details/${userId}`);
  };
  const editUser =(userID)=>{
    onLinkClick(`post-edit/${userID}`)
  }
  return (
    <>
      <div className="mt-5">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 20,
            }}
          >
            <Typography gutterBottom variant="h3" component="div">
              Post List
            </Typography>
            <Button
              variant="contained"
              style={{ width: "150px", height: "50px" }}
              onClick={() => onLinkClick("add-post")}
            >
              Add
            </Button>
          </div>
          <Divider />

          <Box height={10} />
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                      id
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                      Category
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                      Sub -Category
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                      Company
                    </Typography>
                  </TableCell>

                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                      Description
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                      Due Date
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
                {userList.map((user, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell key={user.id}>
                        <Typography variant="h5">{index + 1}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h5">
                          {user.category.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h5">
                          {user.sub_category.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h5">
                          {user.company.name}
                        </Typography>
                      </TableCell>

                      <TableCell align="left">
                        <Typography variant="h5" className="ms-3">
                          {user.description}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h5" className="ms-3">
                          {user.ending_date}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Stack spacing={2} direction="row">
                          <DeleteIcon
                            sx={{ fontSize: "30px", color: "red" }}
                            onClick={() => deleteUser(user.id)}
                          />
                          <ModeEditIcon onClick={()=>{
                            editUser(user.id)
                          }}/>
                          <Details
                            onClick={() => {
                              UserPostDetail(user.id);
                            }}
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
