import React, {useContext, useEffect, useState} from "react";
import TaskRow from "../../../components/task/TaskRow";
import AddTaskForm from "../../../components/task/AddTaskForm";
import DataContext from "../../../contexts/data.context";
import {taskService} from "../../../services";

function User() {
  return (
    <><h1>User page</h1></>
  )
}

export default User;
