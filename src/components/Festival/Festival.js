import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { FestivalPopup } from "../FestivalPopup/FestivalPopup.js";
import { ModalComponent } from "../Modal/ModalComponent.js";
import "./Festival.css";
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
      <div className="rigster-container">
        <h1 className="title">Festival</h1>
        <div className="actions"></div>
        <ModalComponent modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <FestivalPopup modalOpen1={modalOpen1} setModalOpen1={setModalOpen1} />
        <div className="tableContainer">
          <table className="table" aria-label="simple table">
            <thead>
              <tr>
                <th style={{display:"flex",flexDirection:"row" ,justifyContent:"space-between"}}>
                  <tr className="headerCell">Categories</tr>
                  <tr>
                <button
                  className="addButton"
                  onClick={() => setModalOpen(true)}
                >
                  <IoAddCircleSharp className="addButtonIcon" />
                  <p>Add Categories</p>
                </button></tr>
                </th>

              </tr>
            </thead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" sx={{ fontSize: "14px" }}>
                    {row.Festival}
                  </TableCell>

                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                    />
                  </div>
                </TableRow>
              ))}
            </TableBody>
          </table>
        </div>
      </div>
    </>
  );
};
