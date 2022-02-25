import React from 'react';
import {authService} from "../../services";

const Sidebar = ({admin}) => {
  return (
    <div className="l-sidenav">
      <div className="l-sidenav__link" onClick={() => window.location.href = "/projects"}><i className="ri-folder-shield-fill me-3 h2"></i>Project</div>
      <div className="l-sidenav__link" onClick={() => window.location.href = "/tasks/me"}><i className="ri-task-fill me-3 h2"></i>My tasks</div>
      {
        admin && <div className="l-sidenav__link" onClick={() => window.location.href = "/users"}><i className="ri-folder-user-fill me-3 h2"></i>Users</div>
      }
      <hr/>
      <div className="l-sidenav__link" onClick={async () => {
        console.log('ih')
        await authService.signOut();
        window.location.href = '/';
      }}><i className="ri-logout-box-r-fill me-3 h2"></i>Log out</div>
    </div>
  )
}

export default Sidebar;