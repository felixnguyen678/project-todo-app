import React, {useContext} from "react";
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./routes";
import TasksOfProject from "./routes/projects/[id]/tasks";
import SignIn from "./routes/sign-in";
import SignUp from "./routes/sign-up";
import Users from "./routes/users";
import CreateUser from "./routes/users/create";
import EditUser from "./routes/users/[id]/edit";
import Projects from "./routes/projects";
import Project from "./routes/projects/[id]";
import User from "./routes/users/[id]";
import CreateProject from "./routes/projects/create";
import EditProject from "./routes/projects/[id]/edit";
import Header from "./components/common/Header";
import AuthContext from "./contexts/auth.context";
import Cookies from "js-cookie";
import {ACCESS_TOKEN_COOKIE} from "./services/auth.service";

function App(props) {

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users/:id/edit" element={<EditUser />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/create" element={<CreateProject/>} />
          <Route path="/projects/:id/edit" element={<EditProject />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/projects/:id/tasks" element={<TasksOfProject />} />


          <Route path="/projects/me" element={<Home />} />
          <Route path="/tasks/me" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;