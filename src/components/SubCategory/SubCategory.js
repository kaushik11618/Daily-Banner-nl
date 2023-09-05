import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";

export const SubCategoryList = ({
  fetchCategories,
  setModalOpen,
  subcategories,
}) => {
  const [subCategories, setSubCategories] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setSubCategories(subcategories);
  }, [subcategories]);

  const deleteCategory = async (subcategory_id) => {
    console.log("delete");
    try {
      await fetch(`http://192.168.29.12:3000/api/category/${subcategory_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  return (
    <div>
      {subCategories.map((subCategory) => (
        <div
          key={subCategory.id}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <p style={{ color: "black" }}>{subCategory.name}</p>
          <div style={{ justifyContent: "space-around" }}>
            <BsFillPencilFill
              onClick={() => {
                setModalOpen(true);
              }}
            />
            <MdDeleteForever
              onClick={() => deleteCategory(subCategory.id)}
              size={20}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
