import {
  Autocomplete,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React from "react";
import "./Post.css";

const dropdownOptions = [
  { name: "kaushik" },
  { name: "viren" },
  { name: "kaushik" },
  { name: "kaushik" },
];
export const Post = () => {
  return (
    <Container
      maxWidth="md"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form className="post-form">
        <div className="dropdown mt-3 d-flex flex-column gap-4">
          <Autocomplete
            disablePortal
            options={dropdownOptions.map((op) => ({
              label: op.name,
            }))}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          <Autocomplete
            disablePortal
            options={dropdownOptions.map((op) => ({
              label: op.name,
            }))}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          <Autocomplete
            disablePortal
            options={dropdownOptions.map((op) => ({
              label: op.name,
            }))}
            renderInput={(params) => <TextField {...params} label="Category" />}
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
            <FormControlLabel control={<Checkbox />} label="Adress" />
            <FormControlLabel control={<Checkbox />} label="Linkedin" />
            <FormControlLabel control={<Checkbox />} label="Facebook" />
            <FormControlLabel control={<Checkbox />} label="Twitter" />
            <FormControlLabel control={<Checkbox />} label="Instagram" />
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
