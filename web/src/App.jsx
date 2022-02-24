import React, {useContext, useEffect} from "react";
import "./App.scss"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages";
import TasksOfProject from "./pages/projects/[id]/tasks";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Users from "./pages/users";
import CreateUser from "./pages/users/create";
import EditUser from "./pages/users/[id]/edit";
import Projects from "./pages/projects";
import Project from "./pages/projects/[id]";
import User from "./pages/users/[id]";
import CreateProject from "./pages/projects/create";
import EditProject from "./pages/projects/[id]/edit";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import useAuth from "./hooks/useAuth";
import Cookies from "js-cookie";
function App(props) {
  const auth = useAuth();
  useEffect(async () => {
    await auth.fetchLoginUser();
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
      <Header />
      <Sidebar />
      <div className="l-main">
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
      </div>
    </>
  )
}

export default App;