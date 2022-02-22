import React from "react";
import './projectCard.scss'
import {format2ShortDate} from "../../core/helpers";
import {useNavigate} from "react-router";

const ProjectCard = ({project}) => {
  const navigate = useNavigate();
  return (
    <div className={`c-project-card`}>
      <div className="d-flex flex-column h-100 justify-content-between">
        <div>
          <div className="d-flex justify-content-between">
            <h3 className="ms-3 mt-3">{project.projectName}</h3>
            <div className="mt-3 me-3">
              <i className="ri-list-check c-project-card__button h5 me-2" onClick={() => navigate(`/projects/${project.projectId}/tasks`, { state: {project} })}></i>
              <i className="ri-eye-line c-project-card__button h5 me-2" onClick={() => navigate(`/projects/${project.projectId}`, { state: {project} })}/>
              <i className="ri-edit-box-line c-project-card__button h5" onClick={() => navigate(`/projects/${project.projectId}/edit`, { state: {project} })}></i>
            </div>
          </div>
          <p className="ms-3 text-secondary">{project.projectId}</p>
        </div>
        <div className="mx-3 mb-2 d-flex justify-content-between">
          <small>{format2ShortDate(project.createdAt)} - {format2ShortDate(project.finishedAt)}</small>
          <b>{project.members ? project.members.length : 0} members</b>
        </div>
      </div>

    </div>
  )
}

export default ProjectCard;