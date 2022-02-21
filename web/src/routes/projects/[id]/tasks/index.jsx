import React, {useContext, useEffect, useState} from "react";
import TaskRow from "../../../../components/task/TaskRow";
import AddTaskForm from "../../../../components/task/AddTaskForm";
import DataContext from "../../../../contexts/data.context";
import {taskService} from "../../../../services";
import {useLocation} from "react-router";

function TasksOfProject() {
  const {state} = useLocation();
  const {project} = state;
  const [tasks, setTasks] = useState([]);
  const [isAllDataLoading, setIsAllDataLoading] = useContext(DataContext.context);
  const [isLoading, setIsLoading] = useState(false);

  async function getTaskFromDatabase() {
    setIsLoading(true);
    const dataFromDatabase = await taskService.getTasksOfProject(project.projectId);
    setTasks(dataFromDatabase);
    setIsLoading(false);
  }

  useEffect(async () => {
    await getTaskFromDatabase()
  },[]);


  return (
    <>

        <div className="container mt-5">
          <AddTaskForm project={project}/>
          <div className="row border-2 border-dark border-bottom p-2">
            <strong className="col-1">Done</strong>
            <strong className="col-5 text-start"><div className="ps-4">Task Name</div></strong>
            <strong className="col-3 text-start"><div className="ps-4">Owner</div></strong>
            <strong className="col-3">Action</strong>
          </div>
          {
            isLoading && (<div className="spinner-border mt-5 mx-auto d-block" role="status">
              <span className="visually-hidden"/>
            </div>)
          }
          {
            tasks.map(task => (
              <TaskRow task={task}/>)
            )
          }
        </div>
    </>
  );
}

export default TasksOfProject;
