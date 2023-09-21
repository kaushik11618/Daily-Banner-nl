import React, {useEffect, useState} from 'react';
import './design.css';
import axios from 'axios';
import {DataGrid} from '@mui/x-data-grid';

const Design = () => {
    const [userData, setUserData] = useState([]);
    const [sequentialIds, setSequentialIds] = useState([]);

    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            const response = await axios.get('http://192.168.29.12:3000/api/admin/users', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const ids = Array.from({length: response.data.length}, (_, index) => index + 1);
            setSequentialIds(ids);

            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {userData.length > 0 && (
                <div>
                    <DataGrid
                        sx={{fontSize: '15px'}}
                        rows={userData.map((user, index) => ({
                            ...user,
                            id: sequentialIds[index],
                        }))}
                        columns={[
                            {field: 'id', headerName: 'Id', width: 70},
                            {field: 'slug', headerName: 'Name', width: 150},
                            {field: 'first_name', headerName: 'First Name', width: 150},
                            {field: 'last_name', headerName: 'Last Name', width: 150},
                            {field: 'email', headerName: 'Email', width: 280},
                            {field: 'phoneNumber', headerName: 'Phone Number', width: 200},
                            {field: 'address', headerName: 'Address', width: 350},
                        ]}
                        initialState={{
                            pagination: {
                                paginationModel: {page: 0, pageSize: 4},
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                </div>
            )}
        </>
    );
};

export default Design;


// <main className="table">
//     <section className="table__header">
//         <h1>User's Details</h1>
//     </section>
//     <section className="table__body">
//         <table>
//             <thead>
//             <tr>
//                 <th> Id <span className="icon-arrow"></span></th>
//                 <th> first_name <span className="icon-arrow"></span></th>
//                 <th> last_name <span className="icon-arrow"></span></th>
//                 <th> email <span className="icon-arrow"></span></th>
//                 <th> Phone Number <span className="icon-arrow"></span></th>
//                 <th> Address <span className="icon-arrow"></span></th>
//             </tr>
//             </thead>
//
//             {userData.map((user, index) => (
//                 <>
//                     <tbody>
//                     <tr>
//                         <td>{user.id}</td>
//                         <td>{user.first_name}</td>
//                         <td>{user.last_name}</td>
//                         <td>{user.email}</td>
//                         <td>{user.phoneNumber}</td>
//                         <td>{user.address}</td>
//                     </tr>
//                     </tbody>
//                 </>
//             ))}
//
//         </table>
//     </section>
// </main>