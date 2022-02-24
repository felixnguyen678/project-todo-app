import React from 'react';
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="l-sidenav">
      <div className="l-sidenav__link" onClick={() => window.location.href = "/projects"}><i className="ri-folder-shield-fill me-3 h2"></i>Project</div>
      <div className="l-sidenav__link" onClick={() => window.location.href = "/tasks"}><i className="ri-task-fill me-3 h2"></i>Tasks</div>
      <div className="l-sidenav__link" onClick={() => window.location.href = "/users"}><i className="ri-folder-user-fill me-3 h2"></i>Users</div>
      <hr/>
      <div className="l-sidenav__link" onClick={() => {

      }}><i className="ri-logout-box-r-fill me-3 h2"></i>Log out</div>
    </div>
  )
}

export default Sidebar;