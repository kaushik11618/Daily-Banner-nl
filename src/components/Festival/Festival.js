import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { ModalComponent } from "../Modal/ModalComponent.js";
import { FestivalPopup } from "../FestivalPopup/FestivalPopup.js";
function createData(id, Festival, Date, Desciption) {
  return { id, Festival, Date, Desciption };
}

const rows = [
  createData(1, "Diwali", "23/01/2021", "hello "),
  createData(2, "Navaratri", "23/09/2022", "navtratri"),
  createData(3, "Holi", "12/03/201", "holi"),
];

export const Festival = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IoAddCircleSharp size={30} onClick={() => setModalOpen(true)} />
          <ModalComponent modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
        <FestivalPopup modalOpen1={modalOpen1} setModalOpen1={setModalOpen1} />
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 450, fontSize: "large" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Id
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Festival Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  onClick={() => setModalOpen1(true)}
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" sx={{ fontSize: "14px" }}>
                    {row.id}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: "14px" }}>
                    {row.Festival}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: "14px" }}>
                    {row.Date}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: "14px" }}>
                    {row.Desciption}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
