import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {userService} from "../../../services";
import {projectService} from "../../../services";

function CreateProject(props) {
  const history = useLocation();
  const {project} = history.state;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const chosenMember = useRef();
  const [updatedProject, setUpdatedProject] = useState({...project});

  useEffect(async () => {
    const dataFromDatabase = await userService.getAllUsers();
    chosenMember.current = dataFromDatabase[0].username;
    setUsers(dataFromDatabase);
  },[]);

  return (
    <>
      <div className="container pt-5">
        <div className="w-50 border p-5 mx-auto">
          <div className="mb-3">
            <label htmlFor="projectId" className="form-label">ProjectId:</label>
            <input disabled={true} value={project.projectId} type="text" className="form-control" id="projectId"/>
          </div>
          <div className="mb-3">
            <label htmlFor="projectName" className="form-label">Project Name:</label>
            <input type="text"value={updatedProject.projectName} className="form-control" id="projectName"  onChange={(e) => setUpdatedProject({...updatedProject, projectName: e.target.value})}/>
          </div>
          <div className="mb-3">
            <label htmlFor="createdAt" className="form-label">Created At:</label>
            <input type="date" value={updatedProject.createdAt} className="form-control" id="createdAt"  onChange={(e) => setUpdatedProject({...updatedProject, createdAt: e.target.value})}/>
          </div>
          <div className="mb-3">
            <label htmlFor="finishedAt" className="form-label">Finished At:</label>
            <input type="date" value={updatedProject.finishedAt} className="form-control" id="finishedAt"  onChange={(e) => setUpdatedProject({...updatedProject, finishedAt: e.target.value})}/>
          </div>
          <div className="mb-3">
            <label htmlFor="members" className="form-label">Add Members:</label>
            <div className="d-flex">
              <select className="form-select me-2" id="members"  onChange={(e) => {
                chosenMember.current = e.target.value;
              }}>
                {
                  users.map(user => <option value={user.username}>{user.username}</option>)
                }
              </select>
              <button className="btn btn-success" onClick={(e) => {
                if(project.members.filter(member => member === chosenMember.current).length === 0){
                  const newProject = {...updatedProject};
                  newProject.members.push(chosenMember.current);
                  setUpdatedProject(newProject);
                }
              }}>Add</button>
            </div>
          </div>
          <div className="mb-3">
            {
              project.members.map(member => <div className="badge bg-primary me-1" onClick={(e) => {
                const newProject = {...updatedProject, member: updatedProject.members.filter(item => item !== member)};
                setUpdatedProject(newProject);
              }}>{member}</div> )
            }
          </div>

          <button className="btn btn-primary" onClick={async () => {
            await projectService.updateProjectById(project.projectId, {
              projectName: updatedProject.projectName,
              members: updatedProject.members,
              createdAt: updatedProject.createdAt,
              finishedAt: updatedProject.finishedAt
            });
            window.location.reload();
          }}>Update</button>
        </div>
      </div>

    </>
  )
}

export default CreateProject;