import axios from "axios";

export async function getAllTasks() {
  const {data} = await axios.post(`http://localhost:8080/get-tasks`);
  console.log(data);
  return data;
}