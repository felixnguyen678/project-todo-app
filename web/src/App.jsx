import './App.css';
import React, {useEffect, useState} from "react";
import {getAllTasks} from "./services/task.service";
import TaskRow from "./components/TaskRow";
import AddTaskForm from "./components/AddTaskForm";

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
  return (
    <div className="l-app">
      <header className="l-app__header">
        Todo App
      </header>
      {
        isLoading && (<div className="spinner-border mt-5" role="status">
          <span className="visually-hidden"/>
        </div>)
      }
      <div className="container mt-5">
        <AddTaskForm />

        {
          data.map(task => (
            <TaskRow task={task}/>)
          )
        }
      </div>
    </div>
  );
}

export default App;
