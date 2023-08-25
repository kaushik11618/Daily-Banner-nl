import { Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const CategoryPopup = ({ modalOpen, setModalOpen }) => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    async function fetchDropdownOptions() {
      try {
        const response = await axios.get(
          "http://192.168.29.12:3000/api/category"
        );
        setDropdownOptions(response.data.map((item) => item.name));
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    }
    if (modalOpen) {
      fetchDropdownOptions();
    }
  }, [modalOpen]);

  const handleAddCategory = async () => {
    const requestData = {
      name: categoryName,
    };

    try {
      const response = await axios.post(
        "http://192.168.29.12:3000/api/category",
        requestData
      );

      console.log("Data posted:", response.data);

      // Close the modal
      setModalOpen(false);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <Modal
      title="Add Category"
      open={modalOpen}
      onOk={handleAddCategory}
      onCancel={() => {
        setModalOpen(false);
      }}
      footer={[
        <Button key="add" type="primary" onClick={handleAddCategory}>
          Add
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
        <div className="dropdown mt-5">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">Select an option</option>
            {dropdownOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Modal>
  );
};
