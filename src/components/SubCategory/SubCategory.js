import React, {useEffect, useState} from "react";
import {MdDeleteForever, MdEdit} from "react-icons/md";
import Toggle from "../Toggle";

export const SubCategoryList = ({
  subcategory,
  editCategory,
  fetchCategories,
}) => {
  const [subCategories, setSubCategories] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setSubCategories(subcategory);
  }, [subcategory]);

  const handleDelete = async (subCategoryId) => {
    const conformDelete = window.confirm(
      "are your you want to delete this category"
    );
    if (conformDelete) {
      try {
        await fetch(`http://192.168.29.12:3000/api/category/${subCategoryId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setSubCategories((prevSubCategories) =>
          prevSubCategories.filter(
            (subCategory) => subCategory.id !== subCategoryId
          )
        );
      } catch (error) {
        console.error("Error deleting sub-category:", error);
      }
    }
  };

  return (
    <div>
      {subCategories.map((item) => (
        <div
          key={item.id}
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <p className="text-dark text-start fs-5 fw-bold ">{item.name}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Toggle
              categoryStatus={item.status}
              toggleID={item.id}
              ontoggle={fetchCategories}
              toggleType="subcategory"
            />
            <MdEdit
              type="button"
              size={18}
              onClick={() => {
                editCategory(item.id, item.name, item.category_id);
              }}
            />
            <MdDeleteForever
              type="button"
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
