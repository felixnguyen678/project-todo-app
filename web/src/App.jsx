import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages";
import TasksOfProjectPage from "./pages/projects/[id]/tasks";

function App(props) {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="tasks" element={<TasksOfProjectPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;