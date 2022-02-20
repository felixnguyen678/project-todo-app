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
      <input className="col-1 mt-3 c-todo-checkbox" type="checkbox" checked={task.isDone} value="done" onChange={ async (e) =>{
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
                    <i className="ri-delete-bin-6-line h5"></i>

        </button>

      </span>
    </div>
  )
}

export default TaskRow;