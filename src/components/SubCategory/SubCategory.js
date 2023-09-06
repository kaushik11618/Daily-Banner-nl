import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react"; // Import useEffect
import { MdDeleteForever, MdEdit } from "react-icons/md";

export const SubCategoryList = ({ subcategory,editCategory }) => {
  const [subCategories, setSubCategories] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setSubCategories(subcategory);
  }, [subcategory]);

  const handleDelete = async (subCategoryId) => {
    try {
      await axios.delete(
        `http://192.168.29.12:3000/api/category/${subCategoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubCategories((prevSubCategories) =>
        prevSubCategories.filter(
          (subCategory) => subCategory.id !== subCategoryId
        )
      );
    } catch (error) {
      console.error("Error deleting sub-category:", error);
    }
  };

  return (
    <div>
      {subCategories.map((item) => (
        <div key={item.id}>
          <p className="text-dark ms-5 text-start ">{item.name}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "relative",
              bottom: "25px",
            }}
          >
            <MdEdit
              size={18}
              onClick={() => {
                editCategory(item.id, item.name,item.category_id);
              }}
            />
            <MdDeleteForever
              className="ms-4"
              onClick={() => handleDelete(item.id)}
              size={18}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
