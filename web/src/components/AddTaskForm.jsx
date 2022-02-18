import React, {useState} from "react";

function AddTaskForm(props) {
    return(
        <>
            <div className="d-flex justify-content-center mb-5">

                <label htmlFor="newTaskName" className="col-form-label me-3">NewTask:</label>
                <input type="text" id="newTaskName" className="form-control w-50 me-3" aria-describedby="passwordHelpInline" />
                <button type="submit" className="btn btn-primary">Add new task</button>
            </div>
        </>
    )
}

export default AddTaskForm;