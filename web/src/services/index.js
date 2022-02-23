import TaskService from "./task.service";
import UserService from "./user.service";
import ProjectService from "./project.service";
import AuthService from "./auth.service";
import restConnector from "../core/connectors/restConnector";


// singleton
export const taskService = new TaskService(restConnector);
export const userService = new UserService(restConnector);
export const projectService = new ProjectService(restConnector);
export const authService = new AuthService(restConnector);