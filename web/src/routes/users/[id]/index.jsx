import React, {useContext, useEffect, useState} from "react";
import TaskRow from "../../../components/TaskRow";
import AddTaskForm from "../../../components/AddTaskForm";
import DataContext from "../../../contexts/data.context";
import {taskService} from "../../../services";

function User() {
  const [tasks, setTasks] = useState([]);
  const [isAllDataLoading, setIsAllDataLoading] = useContext(DataContext.context);
  const [isLoading, setIsLoading] = useState(false);

  async function getTaskFromDatabase() {
    setIsLoading(true);
    const dataFromDatabase = await taskService.getAllTasks();
    setTasks(dataFromDatabase);
    setIsLoading(false);
  }

  useEffect(async () => {
    await getTaskFromDatabase()
  },[]);


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
        <div className="row border-2 border-dark border-bottom p-2">
          <strong className="col-1">Done</strong>
          <strong className="col-5 text-start"><div className="ps-4">Task Name</div></strong>
          <strong className="col-3 text-start"><div className="ps-4">Owner</div></strong>
          <strong className="col-3">Action</strong>
        </div>
        {
          tasks.map(task => (
            <TaskRow task={task}/>)
          )
        }
      </div>
    </div>
  );
}

export default User;
