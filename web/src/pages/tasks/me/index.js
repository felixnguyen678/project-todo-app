import React, {useEffect, useState} from "react";
import {taskService} from "../../../services";
import useAuth from "../../../hooks/useAuth";

const MyTasks = () => {
  const {loginUser} = useAuth();
  const [tasks, setTasks] = useState();
  useEffect( async () => {
    const tasksFromDatabase = await taskService.getTasksOfOwner(loginUser.username);

  }, [])
}