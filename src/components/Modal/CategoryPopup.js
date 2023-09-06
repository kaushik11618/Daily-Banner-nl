import { Button, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CategoryPopup = ({
  modalOpen,
  setModalOpen,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [isEditingSubcategory, setIsEditingSubcategory] = useState(false); // Add a state to track if editing a subcategory

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchDropdownOptions() {
      try {
        const response = await axios.get(
          "http://192.168.29.12:3000/api/category",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDropdownOptions(response.data);
        if (selectedCategory) {
          setCategoryName(selectedCategory.name);
          setIsEditingSubcategory(!!selectedCategory.category_id); // Set isEditingSubcategory based on whether category_id is present
          setSelectedOption(selectedCategory.category_id || ""); // Set selectedOption based on category_id
        } else {
          setCategoryName("");
          setIsEditingSubcategory(false);
          setSelectedOption("");
        }
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    }
    if (modalOpen) {
      fetchDropdownOptions();
    }
  }, [modalOpen, selectedCategory]);

  const handleSaveCategory = async () => {
    const requestData = {
      name: categoryName,
      category_id: isEditingSubcategory ? selectedOption : null, // Use selectedOption when editing subcategory
    };

    try {
      if (selectedCategory) {
        await axios.patch(
          `http://192.168.29.12:3000/api/category/${selectedCategory.id}`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(isEditingSubcategory ? "Subcategory updated successfully!" : "Category updated successfully!");
        setSelectedCategory("");
      } else {
        await axios.post(
          "http://192.168.29.12:3000/api/category",
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(isEditingSubcategory ? "Subcategory added successfully!" : "Category added successfully!");
      }
      setCategoryName("");
      setSelectedOption("");
      setIsEditingSubcategory(false); // Reset isEditingSubcategory
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedCategory("");
    setCategoryName("");
    setSelectedOption("");
    setIsEditingSubcategory(false); // Reset isEditingSubcategory
    setModalOpen(false);
  };

  return (
    <Modal
      title={isEditingSubcategory ? "Edit Subcategory" : "Add Category"}
      open={modalOpen}
      onCancel={handleCloseModal}
      footer={[
        <Button
          key="add"
          type="primary"
          onClick={handleSaveCategory}
          disabled={!categoryName}
        >
          {isEditingSubcategory ? "Save Subcategory" : "Add"}
        </Button>,
      ]}
    >
      <div className="d-flex flex-column">
        <div>
          <label>{isEditingSubcategory ? "Subcategory Name" : "Category Name"}</label>
        </div>
        <input
          placeholder={isEditingSubcategory ? "Subcategory Name" : "Category Name"}
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        
        {isEditingSubcategory ? (
          <div className="mt-3">
            <div className="dropdown mt-3">
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
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
        ) : (
          <div className="dropdown mt-3">
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select a category</option>
              {dropdownOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </Modal>
  );
};