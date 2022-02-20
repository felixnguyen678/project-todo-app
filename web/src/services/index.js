import TaskService from "./task.service";
import UserService from "./user.service";
import {restConnector} from "../core/connectors/restConnector";

export const taskService = new TaskService(restConnector);
export const userService = new UserService(restConnector);