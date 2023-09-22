import React, {useEffect, useState} from "react";
import {Autocomplete, Checkbox, Container, FormControlLabel, TextField,} from "@mui/material";
import "./Post.css";
import axios from "axios";

export const Post = () => {
  const [categories, setCategories] = useState([]);
  const [company, setCompany] = useState([])

  const token = localStorage.getItem('token')

  useEffect(() => {

    const fetchCategory = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/category/all", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        setCategories(response.data)
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }


    const fetchCompany = async () => {
      try {
        const response = await axios.get("http://192.168.29.12:3000/api/company", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        setCompany(response.data)
      } catch (error) {
        console.error("Error deleting company", error)
      }
    }

    fetchCategory()
    fetchCompany()
  }, []);


  return (
      <Container
          maxWidth="md"
          sx={{display: "flex", flexDirection: "column", alignItems: "center"}}
      >
        <form className="post-form">
          <div className="dropdown mt-3 d-flex flex-column gap-4">
            <Autocomplete
                disablePortal
                options={categories.map((category) => ({
                  label: category.name,
                }))}
                renderInput={(params) => <TextField {...params} label="Category"/>}
            />
            <Autocomplete
                disablePortal
                options={company.map((company) => ({
                  label: company.name,
                }))}
                renderInput={(params) => <TextField {...params} label="Company"/>}
            />
            <div className="d-flex flex-column">
              <p>Description</p>
              <textarea></textarea>
            </div>
            <div className="d-flex flex-column">
              <p>Note</p>
              <textarea></textarea>
            </div>
            <div className="d-flex flex-row flex-wrap">
              <FormControlLabel control={<Checkbox/>} label="Adress"/>
              <FormControlLabel control={<Checkbox/>} label="Linkedin"/>
              <FormControlLabel control={<Checkbox/>} label="Facebook"/>
              <FormControlLabel control={<Checkbox/>} label="Twitter"/>
              <FormControlLabel control={<Checkbox/>} label="Instagram"/>
            </div>
            <div>
              <p>Due Date</p>
              <input type="date"></input>
            </div>
            <div>
              <p>post Date</p>
              <input type="date"></input>
            </div>
            <button>Submit</button>
          </div>
        </form>
      </Container>
  );
};
