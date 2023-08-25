import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, {useEffect, useState} from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { CategoryPopup} from "../Modal/CategoryPopup.js";
import "./Category.css";
import Toggle from "../Toggle";
function createData(id, Festival, Date, Desciption) {
  return { id, Festival, Date, Desciption };
}

const rows = [
  createData(1, "Diwali", "23/01/2021", "hello "),
  createData(2, "Navaratri", "23/09/2022", "navtratri"),
  createData(3, "Holi", "12/03/201", "holi"),
  createData(3, "Holi", "12/03/201", "holi"),

];

export const Category = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://192.168.29.12:3000/api/category")
        .then((response) => response.json())
        .then((data) => setCategories(data))
        .catch((error) => console.error("Error fetching data:", error));
  }, []);


  return (
    <>
      <div className="rigster-container">
        <h1 className="title">Category</h1>
        <div className="actions"></div>
        <CategoryPopup modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <div className="tableContainer">
          <table className="table" aria-label="simple table">
            <thead>
              <tr>
                <th
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <tr className="headerCell">Categories</tr>
                  <tr>
                    <button
                      className="addButton"
                      onClick={() => setModalOpen(true)}
                    >
                      <IoAddCircleSharp className="addButtonIcon" />
                      <p>Add Categories</p>
                    </button>
                  </tr>
                </th>
              </tr>
            </thead>
            <TableBody>
              {categories.map((category) => (
                  <TableRow key={category.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="left" sx={{ fontSize: "14px" }}>
                      {category.name}
                    </TableCell>
                    <Toggle />
                  </TableRow>
              ))}
            </TableBody>
          </table>
        </div>
      </div>
    </>
  );
};
