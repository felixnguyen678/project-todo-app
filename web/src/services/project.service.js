import Project from "../models/project.model";

function ProjectService(restConnector) {
  this.restConnector = restConnector;

  this.getAllProjects = async () => {
    const {data} = await this.restConnector.get('/projects');
    return data.map(project => new Project(project._id, project.projectId, project.projectName, project.members, new Date(project.createdAt), new Date(project.finishedAt)));
  }

  this.getProjectsOfUser = async (username) => {
    const {data} = await this.restConnector.get(`/projects?members=${username}`);
    return data.map(project => new Project(project._id, project.projectId, project.projectName, project.members, new Date(project.createdAt), new Date(project.finishedAt)));
  }

  this.getProjectByProjectId = async (projectId) => {
    const {data} = await this.restConnector.get(`/projects/${projectId}`);
    return data ? new Project(data._id, data.projectId, data.projectName, data.members, new Date(data.createdAt), new Date(data.finishedAt)): undefined;
  }

  this.createProject = async (project)  => {
    const {data} = await this.restConnector.post(`/projects`, project);
    return data;
  }

  this.updateProjectById = async (projectId, updateInformation) => {
    const {data} = await  this.restConnector.patch(`/projects/${projectId}/update`, updateInformation);
    return data;
  }


}

export default ProjectService;