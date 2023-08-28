import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import axios from "axios";

export const CategoryPopup = ({ modalOpen, setModalOpen }) => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchDropdownOptions() {
      try {
        const response = await axios.get(
          "http://192.168.29.12:3000/api/category",
            {
              headers:{
                Authorization:`Bearer ${token}`,
              }
            }
        );
        setDropdownOptions(response.data);
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    }
    if (modalOpen) {
      fetchDropdownOptions();
    }
  }, [modalOpen]);

  const handleAddCategory = async () => {
    const selectedCategory = dropdownOptions.find(
      (option) => option.id === selectedOption
    );

    const requestData = {
      name: categoryName,
      category_id: selectedCategory ? selectedCategory.id : null,
    };

    try {
      const response = await axios.post(
        "http://192.168.29.12:3000/api/category",
        requestData,
          {
            headers:{
              Authorization:`Bearer ${token}`,
            }
          }

      );

      if (selectedCategory) {
        console.log("Subcategory posted:", response.data);
      } else {
        console.log("Main category posted:", response.data);
      }
      setCategoryName("");
      setSelectedOption("");

      setModalOpen(false);
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <Modal
      title="Add Category and Subcategory"
      open={modalOpen}
      onOk={handleAddCategory}
      onCancel={() => {
        setModalOpen(false);
      }}
      footer={[
        <Button
          key="addCategoryAndSubcategory"
          type="primary"
          onClick={handleAddCategory}
          disabled={!categoryName}
        >
          Add Category and Subcategory
        </Button>,
      ]}
    >
      <div className="d-flex flex-column">
        <div>
          <label>Category Name</label>
        </div>
        <input
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <div className="dropdown mt-3">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(parseInt(e.target.value))}
          >
            <option value="">Select a category</option>
            {dropdownOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Modal>
  );
};
