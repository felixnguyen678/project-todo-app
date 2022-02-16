import React, {useState} from "react";
import {updateTask} from "../services/task.service";

function TaskRow(props) {
  const [isEditing, setEditing] = useState(false);
  const [task, setTask] = useState(props.task);
  return (
    <tr>
      <td scope="row">
        <input className="mt-2" type="checkbox" checked={task.isDone} value="done" onChange={ async (e) =>{
          await updateTask({id: task.taskId, isDone: !task.isDone});
          setTask({...task, isDone: !task.isDone});

        }}/></td>
      <th scope="row" >{isEditing ? (<input type="text" value={task.taskName} onChange={(e) => setTask({...task, taskName: e.target.value})}/>) : task.taskName}</th>
      <td scope="row">
        {
          isEditing ? (<button type="button" className="btn btn-link mx-1" onClick={async () => {
            await updateTask({id: task.taskId, taskName: task.taskName});
            setEditing(false);
          }}>Save</button>) : (
            <button type="button" className="btn btn-link mx-1" onClick={() => setEditing(true)}>Edit</button>
          )
        }

        <button type="button" className="btn btn-white text-danger">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               className="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
          </svg>
        </button>

      </td>
    </tr>
  )
}

export default TaskRow;