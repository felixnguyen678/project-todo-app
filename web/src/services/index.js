import {TaskService} from "./task.service";
import {restConnector} from "../core/connectors/restConnector";

export const taskService = new TaskService(restConnector);