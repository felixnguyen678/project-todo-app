import React from "react";
import './projectCard.scss'
import {format2ShortDate} from "../../core/helpers";
import {useNavigate} from "react-router";

const ProjectCard = ({project}) => {
  const navigate = useNavigate();
  return (
    <div className={`c-project-card`} onClick={() => navigate(`/projects/${project.projectId}`)}>
      <div className="d-flex flex-column h-100 justify-content-between">
        <div>
          <h3 className="ms-3 mt-3">{project.projectName}</h3>
          <p className="ms-3 mt-3 text-secondary">{project.projectId}</p>
        </div>
        <div className="mx-3 mb-2 d-flex justify-content-between">
          <small>{format2ShortDate(project.createdAt)} - {format2ShortDate(project.finishedAt)}</small>
          <b>{project.members ? project.members.length : 0} Members</b>
        </div>
      </div>

    </div>
  )
}

export default ProjectCard;