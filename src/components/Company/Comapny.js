import React from "react";
import { Navigate, useNavigate } from "react-router";

const Comapny = ({ onLinkClick,handleAddCompanySuccess }) => {
  const navigate = useNavigate();

  return (
    <div className="company">
      <button
        onClick={() => {
          onLinkClick("addCompany");
        }}
      >
        Add Companay
      </button>
    </div>
  );
};

export default Comapny;
