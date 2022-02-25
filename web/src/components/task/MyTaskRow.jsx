import React, {useState} from "react";
import {taskService} from "../../services";

function MyTaskRow(props) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [task, setTask] = useState(props.task);

  if(!task || isDeleted) return <></>;

  return (
    <div className="row c-table__row">
      <input className="col-1 mt-3 c-todo-checkbox" type="checkbox" checked={task.isDone} value="done" onChange={ async (e) =>{
        await taskService.updateTaskById(task._id,{isDone: !task.isDone});
        setTask({...task, isDone: !task.isDone});
      }}/>
      <span className="col-5 mt-2 text-start"><div className="ps-4">{task.taskName}</div></span>
      <span className="col-3 mt-2 text-start"><div className="ps-4">{task.project}</div></span>
      <span className="col-3">
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

export default MyTaskRow;