import React, {useContext, useEffect, useState} from "react";
import DataContext from "../../contexts/data.context";
import {taskService} from "../../services";

function TaskRow(props) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [task, setTask] = useState(props.task);

  if(!task || isDeleted) return <></>;

  return (
    <div className="row c-table__row">
      <input className="col-1 mt-3 c-todo-checkbox" type="checkbox" checked={task.isDone} value="done" onChange={ async (e) =>{
        await taskService.updateTaskById(task._id,{isDone: !task.isDone});
        setTask({...task, isDone: !task.isDone});
      }}/>
      <span className="col-5 mt-2 text-start"><div className="ps-4">{isEditing ? (<input type="text" className="form-control" value={task.taskName} onChange={(e) => setTask({...task, taskName: e.target.value})}/>) : task.taskName}</div></span>
      <span className="col-3 mt-2 text-start"><div className="ps-4">{isEditing ? (<select className="form-select" value={task.owner} onChange={(e) => setTask({...task, owner: e.target.value})}>
        {
          props.project.members.map(member => <option value={member}>{member}</option> )
        }
      </select>) : <span className="badge bg-primary">{task.owner}</span>}</div></span>
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
          setIsDeleted(true);
        }}>
                    <i className="ri-delete-bin-6-line h5"></i>

        </button>

      </span>
    </div>
  )
}

export default TaskRow;