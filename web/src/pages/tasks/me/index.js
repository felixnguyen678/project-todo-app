import React, {useEffect, useState} from "react";
import {taskService} from "../../../services";
import useAuth from "../../../hooks/useAuth";
import ProjectTaskRow from "../../../components/task/ProjectTaskRow";
import MyTaskRow from "../../../components/task/MyTaskRow";

const MyTasks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {loginUser} = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect( async () => {
    setIsLoading(true);
    const tasksFromDatabase = await taskService.getTasksOfOwner(loginUser.username);
    setTasks(tasksFromDatabase);
    console.log(tasksFromDatabase);
    setIsLoading(false);

  }, [])


  return (
    <>
      <div className="container mt-5">
        <div className="row c-table__header">
          <strong className="col-1">Done</strong>
          <strong className="col-5 text-start"><div className="ps-4">Task Name</div></strong>
          <strong className="col-3 text-start"><div className="ps-4">Project</div></strong>
          <strong className="col-3">Action</strong>
        </div>
        {
          isLoading && (<div className="spinner-border mt-5 mx-auto d-block" role="status">
            <span className="visually-hidden"/>
          </div>)
        }
        {
          tasks.map(task => (
            <MyTaskRow task={task}/>)
          )
        }
      </div>
    </>
  )
}

export default MyTasks;