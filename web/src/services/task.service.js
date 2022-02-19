import axios from "axios";
import Task from "../models/task.model";



export async function getAllTasks() {
  const {data} = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tasks`);
  return data.map(data => new Task(data._id, data.taskName, data.owner, data.project, new Date(data.createdAt), data.isDone));

}

export async function getTaskById(_id) {
  const {data} = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tasks/${_id}`);
  return data ? new Task(data._id, data.taskName, data.owner, data.project, new Date(data.createdAt), data.isDone) : undefined;
}

export async function updateTaskById(_id, updateInformation){
  const {data} = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/tasks/${_id}/update`, updateInformation);
  return data;
}

export async function deleteTaskById(_id){
  const {data} = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/tasks/${_id}/delete`);
  return data;
}
