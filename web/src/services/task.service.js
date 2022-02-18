import axios from "axios";
import Task from "../models/task.model";

export async function getAllTasks() {
  const {data} = await axios.get(`http://localhost:8080/tasks`);
  return data.map(data => new Task(data._id, data.taskName, data.owner, data.project, new Date(data.createdAt), data.isDone));

}

export async function updateTaskById(_id, updateInformation){
  const {data} = await axios.patch(`http://localhost:8080/${_id}/update`, updateInformation);
  return data;
}
