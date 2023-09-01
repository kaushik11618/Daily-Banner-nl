import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export const SubCategoryList = ({ categoryId }) => {
  const [subCategories, setSubCategories] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function fetchSubCategories() {
      try {
        const response = await axios.post(
          "http://192.168.29.12:3000/api/sub-category",
          { id: categoryId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubCategories(response.data);
      } catch (error) {
        console.error("Error fetching sub-categories:", error);
      }
    }

    fetchSubCategories();
  }, [categoryId]);

  return (
    <div>
      {subCategories.map((subCategory) => (
        <div key={subCategory.id} style={{display:"flex",justifyContent:"space-between"}}>
          <p style={{color:"black"}}>{subCategory.name}</p>
          <MdDeleteForever />
        </div>
      ))}
    </div>
  );
};
