import React from "react";

function Task(props) {
  return (
    <tr>
      <th scope="row">{props.task.taskName}</th>
      <td><span className="badge rounded-pill bg-primary">{props.task.owner}</span></td>
      <td>{props.task.createAt}</td>
      <td>{props.task.isDone ? <span className="badge rounded-pill bg-success">yes</span> : <span className="badge rounded-pill bg-danger">no</span>}</td>
      <td>
        <button type="button" className="btn btn-warning mx-1">Edit</button>
        <button type="button" className="btn btn-danger mx-1">Remove</button>
        <button type="button" className="btn btn-success mx-1">Done</button>

      </td>
    </tr>
  )
}

export default Task;