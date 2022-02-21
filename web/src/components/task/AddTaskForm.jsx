import React, {useContext, useState} from "react";
import DataContext from "../../contexts/data.context";
import {taskService} from "../../services";

function AddTaskForm(props) {

    const [task, setTask] = useState({
      createAt: new Date(),
      project: props.project.projectId,
      owner: props.project.members[0]
    });
    const addTask = async () => {
      await taskService.createTask(task);
      setTask({});
    }
    console.log(task);
    return(
        <>
            <div className="d-flex justify-content-center mb-5">

                <label htmlFor="newTaskName" className="col-form-label me-3">NewTask:</label>
                <input type="text" id="newTaskName" className="form-control w-50 me-3" onChange={(e) => setTask({...task, taskName: e.target.value})}/>
                <label htmlFor="newTaskOnwer" className="col-form-label me-3">Owner:</label>
              <select className="me-3 form-select w-25" id="newTaskOnwer" onChange={(e) => {setTask({...task, owner: e.target.value})}}>
                {
                  props.project.members.map(member => <option value={member}>{member}</option>)
                }
              </select>
                {/*<input type="text" id="newTaskName" className="form-control w-25 me-3" onChange={(e) => setTask({...task, taskName: e.target.value})}/>*/}
                <button className="btn btn-primary" onClick={ async () => {
                  await addTask();
                  window.location.reload();
                }}>Add Task</button>
            </div>
        </>
    )
}

export default AddTaskForm;