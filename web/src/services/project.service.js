import Project from "../models/project.model";

function ProjectService(restConnector) {
  this.restConnector = restConnector;

  this.getAllProject = async () => {
    const {data} = await this.restConnector.get('/projects');
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

}

export default ProjectService;