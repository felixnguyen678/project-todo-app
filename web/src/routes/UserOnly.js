import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import Users from "../pages/users";
import CreateUser from "../pages/users/create";
import User from "../pages/users/[id]";
import EditUser from "../pages/users/[id]/edit";
import Projects from "../pages/projects";
import CreateProject from "../pages/projects/create";
import EditProject from "../pages/projects/[id]/edit";
import Project from "../pages/projects/[id]";
import TasksOfProject from "../pages/projects/[id]/tasks";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import MyTasks from "../pages/tasks/me";

const UserOnly = () => {
  return(
    <>
      <Header/>
      <Sidebar />
      <div className="l-main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/projects/:id/tasks" element={<TasksOfProject />} />
            <Route path="/tasks/me" element={<MyTasks />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default UserOnly;