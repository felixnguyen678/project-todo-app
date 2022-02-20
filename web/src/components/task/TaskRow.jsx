import React, {useContext, useEffect, useState} from "react";
import DataContext from "../../contexts/data.context";
import {taskService} from "../../services";

function TaskRow(props) {
  const [isEditing, setEditing] = useState(false);
  const [isAllDataFetched, setIsAllDataFetched] = useContext(DataContext.context);
  const [isChanging, setIsChanging] = useState(false);
  const [task, setTask] = useState();

  const getTaskFromDb = async () => {
    const taskFromDb = await taskService.getTaskById(props.task._id);
    setTask(taskFromDb);
  }
  useEffect(async () => {
    await getTaskFromDb();
  }, [])
  if(!task) return <></>;

  return (
    <div className="row border-2 border-bottom p-2">
      <input className="col-1 mt-3" type="checkbox" checked={task.isDone} value="done" onChange={ async (e) =>{
        await taskService.updateTaskById(task._id,{isDone: !task.isDone});
        setIsAllDataFetched(false);
        setTask({...task, isDone: !task.isDone});
      }}/>
      <strong className="col-5 mt-2 text-start"><div className="ps-4">{isEditing ? (<input type="text" className="form-control" value={task.taskName} onChange={(e) => setTask({...task, taskName: e.target.value})}/>) : task.taskName}</div></strong>
      <strong className="col-3 mt-2 text-start"><div className="ps-4">{isEditing ? (<input type="text" className="form-control" value={task.owner} onChange={(e) => setTask({...task, owner: e.target.value})}/>) : <span className="badge bg-primary">{task.owner}</span>}</div></strong>
      <span className="col-3">
        {
          isEditing ? (<button type="button" className="btn btn-link" onClick={async () => {
            const data = await taskService.updateTaskById(task._id, {taskName: task.taskName, owner: task.owner});
            setEditing(false);
          }}>Save</button>) : (
            <button type="button" className="btn btn-link" onClick={() => setEditing(true)}>Edit</button>
          )
        }

        <button type="button" className="btn btn-white text-danger" onClick={ async () => {
          await taskService.deleteTaskById(task._id);
          await getTaskFromDb();
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>
        </button>

      </span>
    </div>
  )
}

export default TaskRow;