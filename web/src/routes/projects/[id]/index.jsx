import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {format2InputDate} from "../../../core/helpers";

function ProjectDetail(props) {
  const {state} = useLocation();
  const {project} = state;
  const navigate = useNavigate();

  return (
    <>
      <div className="container pt-5">
        <div className="w-50 border p-5 mx-auto">
          <div className="mb-3">
            <label htmlFor="projectId" className="form-label">ProjectId:</label>
            <input disabled={true} value={project.projectId} type="text" className="form-control" id="projectId" />
          </div>
          <div className="mb-3">
            <label htmlFor="projectName" className="form-label">Project Name:</label>
            <input disabled={true} value={project.projectName} type="text" className="form-control" id="projectName" />
          </div>
          <div className="mb-3">
            <label htmlFor="createdAt" className="form-label">Created At:</label>
            <input disabled={true} value={format2InputDate(project.createdAt)} type="date" className="form-control" id="createdAt" />
          </div>
          <div className="mb-3">
            <label htmlFor="finishedAt" className="form-label">Finished At:</label>
            <input disabled={true} value={format2InputDate(project.finishedAt)} type="date" className="form-control" id="finishedAt" />
          </div>
          <div className="mb-3">
            <label htmlFor="members" className="form-label">Members:</label>
            {
              project.members.map(member => <div className="badge bg-primary ms-1">{member}</div> )
            }
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary me-2" onClick={() => navigate(`/projects/${project.projectId}/edit`, { state: {project} })}>Edit</button>
            <button className="btn btn-primary" onClick={() => navigate(`/projects/${project.projectId}/tasks`, { state: {project} })}>Tasks</button>

          </div>
             </div>
      </div>

    </>
  )
}

export default ProjectDetail;