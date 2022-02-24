import React, {useContext, useEffect, useState} from "react";
import TaskRow from "../../../../components/task/TaskRow";
import AddTaskForm from "../../../../components/task/AddTaskForm";
import DataContext from "../../../../contexts/data.context";
import {projectService, taskService} from "../../../../services";
import {useLocation, useParams} from "react-router";

function TasksOfProject() {
  const {id} = useParams();
  const {state} = useLocation();
  const [tasks, setTasks] = useState([]);
  const [isAllDataLoading, setIsAllDataLoading] = useContext(DataContext.context);
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState();

  async function getTaskFromDatabase() {
    setIsLoading(true);
    const dataFromDatabase = await taskService.getTasksOfProject(id);
    setTasks(dataFromDatabase);
    setIsLoading(false);
  }
  useEffect(async () => {
    setIsLoading(true);
    if(state) {
      setProject(state.project);
    } else {
      const projectFromDatabase = await projectService.getProjectByProjectId(id);
      setProject(projectFromDatabase);
    }
    await getTaskFromDatabase();
    setIsLoading(false)
  },[]);

  return (
    <>

        <div className="container mt-5">
          {
            project && <AddTaskForm project={project}/>
          }
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
              <TaskRow task={task} project={project}/>)
            )
          }
        </div>
    </>
  );
}

export default TasksOfProject;
