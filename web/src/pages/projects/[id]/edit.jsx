import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {userService} from "../../../services";
import {projectService} from "../../../services";
import {format2InputDate} from "../../../core/helpers";
import {toast} from "react-toastify";

function UpdateProject(props) {
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
            <input type="date" value={format2InputDate(updatedProject.createdAt)} className="form-control" id="createdAt"  onChange={(e) => setUpdatedProject({...updatedProject, createdAt: new Date(e.target.value)})}/>
          </div>
          <div className="mb-3">
            <label htmlFor="finishedAt" className="form-label">Finished At:</label>
            <input type="date" value={format2InputDate(updatedProject.finishedAt)} className="form-control" id="finishedAt"  onChange={(e) => setUpdatedProject({...updatedProject, finishedAt: new Date(e.target.value)})}/>
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
              <button className="btn btn-warning" onClick={(e) => {
                if(updatedProject.members.filter(member => member === chosenMember.current).length === 0){
                  const newProject = {...updatedProject};
                  newProject.members.push(chosenMember.current);
                  setUpdatedProject(newProject);
                }
              }}>Add</button>
            </div>
          </div>
          <div className="mb-3">
            {
              updatedProject.members.map(member => <div className="badge c-user-badge me-2 mb-1">{member}<i className="ri-close-line" style={{cursor: "pointer"}}onClick={(e) => {
                const newProject = {...updatedProject, members: updatedProject.members.filter(item => item !== member)};
                setUpdatedProject(newProject);
              }}></i> </div> )
            }
          </div>

          <button className="btn c-button" onClick={async () => {
            try{
              await projectService.updateProjectById(project.projectId, {
                projectName: updatedProject.projectName,
                members: updatedProject.members,
                createdAt: updatedProject.createdAt,
                finishedAt: updatedProject.finishedAt
              });
              toast.success('Update successfully !!!', {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: false,
              });
              navigate('/projects');
            } catch (e) {
              toast.error('Update failed, check again', {
                position: "top-right", autoClose: 1200, hideProgressBar:true
              })
            }
          }}>Update</button>
        </div>
      </div>

    </>
  )
}

export default UpdateProject;