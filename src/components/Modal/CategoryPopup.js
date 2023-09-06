import {Button, Modal} from "antd";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";

export const CategoryPopup = ({
  modalOpen,
  setModalOpen,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [categoryName, setCategoryName] = useState("");

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
        } else {
          setCategoryName("");
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
    const selectedCategoryData = dropdownOptions.find(
      (option) => option.id === selectedOption
    );

    const requestData = {
      name: categoryName,
      category_id: selectedCategoryData ? selectedCategoryData.id : null,
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
        toast.success("Category updated successfully!");
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
        if (selectedCategoryData) {
          toast.success("Sub-Category added successfully!");
        } else {
          toast.success("Category added successfully!");
        }

      }
      setCategoryName("");
      setSelectedOption("");
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedCategory("");
    setCategoryName("");
    setModalOpen(false);
  };
  return (
    <Modal
      title="Add Category and Subcategory"
      open={modalOpen}
      onCancel={handleCloseModal}
      footer={[
        <Button
            key="add"
            type="primary"
            onClick={handleSaveCategory}
            disabled={!categoryName}
        >
          Add
        </Button>
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
