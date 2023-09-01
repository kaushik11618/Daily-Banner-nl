import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { CategoryPopup } from "../Modal/CategoryPopup.js";
import { SubCategoryList } from "../SubCategory/SubCategory.js";
import Toggle from "../Toggle";
import "./Category.css";

export const Category = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const token = localStorage.getItem("token");

  const toggleCategoryExpansion = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null); // Collapse the clicked category if it's already expanded
    } else {
      setExpandedCategory(categoryId); // Expand the clicked category
    }
  };

  const deleteCategory = async (category_id) => {
    try {
      await fetch(`http://192.168.29.12:3000/api/category/${category_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== category_id)
      );
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const fetchCategories = () => {
    fetch("http://192.168.29.12:3000/api/category/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const editCategory = (category_id, category_name) => {
    setModalOpen(true);
    setSelectedCategory({ id: category_id, name: category_name });
  };

  useEffect(() => {
    fetchCategories();
  }, [modalOpen]);

  return (
    <>
      <div className="category-container">
        <h1 className="title">Category</h1>
        <div className="actions"></div>
        <CategoryPopup
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
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
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              {categories.map((category) => (
                <Accordion
                  key={category.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{ cursor: "pointer" }}
                >
                  <AccordionSummary
                    align="left"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <div onClick={() => toggleCategoryExpansion(category.id)}>
                        {category.name}
                      </div>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Toggle
                          categoryStatus={category.status}
                          categoryId={category.id}
                          ontoggle={fetchCategories}
                        />
                        <BsFillPencilFill
                          size={15}
                          style={{ marginTop: "15px", cursor: "pointer" }}
                          onClick={() => {
                            editCategory(category.id, category.name);
                          }}
                        />
                        <MdDeleteForever
                          style={{
                            marginTop: "10px",
                            marginLeft: "10px",
                            cursor: "pointer",
                          }}
                          size={20}
                          onClick={() => deleteCategory(category.id)}
                        />
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails in={expandedCategory === category.id}>
                    <SubCategoryList categoryId={category.id} />
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </table>
        </div>
      </div>
    </>
  );
};
