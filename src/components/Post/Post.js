import {
  Autocomplete,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Post.css";

export const Post = () => {
  const [companyData, setCompanyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [previousSubcategory, setPreviousSubcategory] = useState(null);
  const [selectedCheackbox, setSelectedCheackbox] = useState([]);
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [selectedDueDate, setSelectedDueDate] = useState("");
  const [selectedPostDate, setSelectedPostDate] = useState("");
  const token = localStorage.getItem("token");

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCheackbox([...selectedCheackbox, value]);
    } else {
      setSelectedCheackbox(
        selectedCheackbox.filter((cheackBox) => cheackBox !== value)
      );
    }
  };
  const handleDateChange = (event) => {
    const { value } = event.target;
    setSelectedDueDate(value);
    setSelectedPostDate(value);
  };
  const apiData = {
    category: selectedCategory,
    subCategories: selectedSubcategory,
    company: companyData,
    description: description,
    note: note,
    cheackBox: selectedCheackbox,
    due_date: selectedDueDate,
    post_date: selectedPostDate,
  };
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          "http://192.168.29.12:3000/api/category/all",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setCategoryData(data);
      } catch (error) {}
    };
    const fetchCompany = async () => {
      try {
        const response = await fetch("http://192.168.29.12:3000/api/company", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCompanyData(data);
      } catch (error) {}
    };
    fetchCategory();
    fetchCompany();
  }, [token]);
  const handleCategoryChange = (_, newValue) => {
    setSelectedCategory(newValue);
    if (!newValue) {
      setSelectedSubcategory(null);
      setPreviousSubcategory(null);
    } else {
      if (selectedSubcategory !== previousSubcategory) {
        setPreviousSubcategory(selectedSubcategory);
      }
      setSelectedSubcategory(null);
    }
  };
  const cheackBox = [
    { id: 1, name: "Adress" },
    { id: 2, name: "Linkedin" },
    { id: 3, name: "Facebook" },
    { id: 4, name: "Twitter" },
    { id: 5, name: "Instagram" },
  ];
  return (
    <Container
      maxWidth="md"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form className="post-form">
        <div className="dropdown mt-3 d-flex flex-column gap-4">
          <Autocomplete
            disablePortal
            options={categoryData.map((category) => category.name)}
            value={selectedCategory}
            onChange={handleCategoryChange}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          <Autocomplete
            disablePortal
            options={
              selectedCategory
                ? categoryData
                    .find((category) => category.name === selectedCategory)
                    .subCategories.map((subcategory) => subcategory.name) || []
                : []
            }
            value={selectedSubcategory}
            onChange={(_, newValue) => setSelectedSubcategory(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Subcategory" />
            )}
          />
          <Autocomplete
            disablePortal
            options={companyData.map((op) => ({
              label: op.name,
            }))}
            renderInput={(params) => <TextField {...params} label="Campany" />}
          />
          <div className="d-flex flex-column">
            <p>Description</p>
            <textarea></textarea>
          </div>
          <div className="d-flex flex-column">
            <p>Note</p>
            <textarea></textarea>
          </div>
          <div className="d-flex flex-row">
            {cheackBox.map((river) => (
              <div key={river.id}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={river.name}
                  checked={selectedCheackbox.includes(river.name)}
                  onChange={handleCheckboxChange}
                />
              </div>
            ))}
          </div>
          <div>
            <p>Due Date</p>
            <input
              value={selectedDueDate}
              type="date"
              onChange={handleDateChange}
            ></input>
          </div>
          <div>
            <p>post Date</p>
            <input
              value={selectedPostDate}
              type="date"
              onChange={handleDateChange}
            ></input>
          </div>
          <button>Submit</button>
        </div>
      </form>
    </Container>
  );
};
