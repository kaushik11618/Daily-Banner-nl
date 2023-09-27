import React, {useEffect, useState} from 'react';
import {Box, Button, Checkbox, Chip} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";


const PostList = ({onLinkClick}) => {

    const [userList, setUserList] = useState([])

    const token = localStorage.getItem('token')

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.29.12:3000/api/post', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                const data = await response.json()
                setUserList(data)
            } catch (error) {
                console.log()
            }
        }

        fetchData()
    }, [])

    return (
        <>
            <div className='d-flex justify-content-end'>
                <Button variant="contained"
                        style={{width: "150px", height: "50px", marginTop: '20px'}}
                        onClick={() => onLinkClick("add-post")}
                >
                    Add
                </Button>
            </div>
            <h1 className='text-center'>Post List</h1>
            {userList.length > 0 && (
                <div>
                    <DataGrid sx={{fontSize: '15px'}}
                              rows={userList.map((user, index) => ({
                                  ...user,
                                  id: index + 1,
                                  category: user.category.name,
                                  subCategory: user.subCategory.name,
                                  company: user.company.name,
                              }))}
                              columns={[
                                  {field: 'id', headerName: 'Id', width: 50},
                                  {field: 'category', headerName: 'Category', width: 100},
                                  {field: 'subCategory', headerName: 'SubCategory', width: 120},
                                  {field: 'company', headerName: 'Company', width: 110},
                                  {field: 'note', headerName: 'Note', width: 100},
                                  {field: 'description', headerName: 'Description', width: 160},
                                  {field: 'ending_date', headerName: 'Due Date', width: 140},
                                  {field: 'posting_date', headerName: 'Post Date', width: 130},
                                  {
                                      field: 'socialMedia',
                                      headerName: 'Social Media',
                                      width: 130,
                                      renderCell: (params) => {
                                          return (
                                              <Checkbox sx={{position: 'relative', left: '20px'}}
                                                        checked={parseInt(params.row.socialMedia) === 1}/>
                                          )
                                      }
                                  },
                                  {
                                      field: 'email',
                                      headerName: 'Email',
                                      width: 90,
                                      renderCell: (params) => {
                                          return (
                                              <Checkbox checked={parseInt(params.row.email) === 1}/>
                                          )
                                      }
                                  },
                                  {
                                      field: 'address',
                                      headerName: 'Address',
                                      width: 100,
                                      renderCell: (params) => {
                                          return (
                                              <Checkbox sx={{position: 'relative', left: '10px'}}
                                                        checked={parseInt(params.row.address) === 1}/>
                                          )
                                      }
                                  },
                                  {
                                      field: 'phoneNumber',
                                      headerName: 'Phone',
                                      width: 100,
                                      renderCell: (params) => {
                                          return (
                                              <Checkbox sx={{position: 'relative', left: '10px'}}
                                                        checked={parseInt(params.row.phoneNumber) === 1}/>
                                          )
                                      }
                                  },
                                  {
                                      field: 'postPlatform',
                                      headerName: 'Post Plate-form',
                                      width: 250,
                                      renderCell: (params) => {
                                          console.log("params.row.postPlatform", params.row.postPlatform);
                                          return (
                                              <Box sx={{
                                                  display: 'flex',
                                                  gap: '8px',
                                                  flexWrap: 'wrap',
                                              }}>
                                                  {params.row.postPlatform.map(platform => (
                                                      <Chip label={platform} variant="outlined"/>
                                                  ))}
                                              </Box>
                                          )
                                      }
                                  },
                              ]}
                              initialState={{
                                  pagination: {
                                      paginationModel: {page: 0, pageSize: 6},
                                  },
                              }}
                              pageSizeOptions={[5, 10]}
                    />
                </div>
            )}
        </>
    );
};

export default PostList;
