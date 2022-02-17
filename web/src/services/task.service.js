import axios from "axios";
import Task from "../models/task.model";

export async function getAllTasks() {
  const {data} = await axios.post(`http://localhost:8080/get-tasks`);
  return data.map(data => new Task(data._id, data.taskName, data.owner, data.project, new Date(data.createdAt), data.isDone));

}

export async function updateTask(updateInformation){
  const {data} = await axios.post(`http://localhost:8080/update-task`, updateInformation);
  return data;
}
