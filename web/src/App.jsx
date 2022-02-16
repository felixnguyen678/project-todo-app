import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import React, {Component} from "react";
import axios from 'axios';
import {getAllTasks} from "./services/task.service";
import Task from "./components/Task";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const dataFromDatabase = await getAllTasks();
      setData(dataFromDatabase);
      setIsLoading(false);
    })()
  },[])
  console.log(data);
  return (
    <div className="l-app">
      <header className="l-app__header">
        Todo App
      </header>
      {
        isLoading && (<div className="spinner-border mt-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>)
      }
      <div className="container mt-5">
        <table className="table">
          <thead>
          <tr>
            <th scope="col">Task Name</th>
            <th scope="col">Owner</th>
            <th scope="col">Created At</th>
            <th scope="col">Is Done ?</th>
            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
          {
            data.map(task => (
              <Task task={task}/>)
            )
          }
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default App;