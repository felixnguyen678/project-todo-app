import React from "react";
import {useNavigate} from "react-router";

const AddNewProjectCard = () => {
  const navigate = useNavigate()
  return (
    <div className="c-project-card" onClick={() => navigate("/projects/create")}>
      <i className="ri-add-line h1"></i>
    </div>
  )
}

export default AddNewProjectCard;