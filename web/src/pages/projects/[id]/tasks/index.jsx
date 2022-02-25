import React, {useContext, useEffect, useState} from "react";
import ProjectTaskRow from "../../../../components/task/ProjectTaskRow";
import AddTaskForm from "../../../../components/task/AddTaskForm";
import DataContext from "../../../../contexts/data.context";
import {projectService, taskService} from "../../../../services";
import {useLocation, useParams} from "react-router";

function TasksOfProject() {
  const {id} = useParams();
  const {state} = useLocation();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState();

  async function getTasksFromDatabase() {
    setIsLoading(true);
    const dataFromDatabase = await taskService.getTasksOfProject(id);
    setTasks(dataFromDatabase.reverse());
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
    await getTasksFromDatabase();
    setIsLoading(false)
  },[]);

  return (
    <>

        <div className="container mt-5">
          {
            project && <AddTaskForm project={project}/>
          }
          <div className="row c-table__header">
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
              <ProjectTaskRow task={task} project={project}/>)
            )
          }
        </div>
    </>
  );
}

export default TasksOfProject;
