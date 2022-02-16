function Project(projectId, projectName, createdAt, endAt, isDone, members) {
  this.projectId = projectId;
  this.projectName = projectName;
  this.createdAt = createdAt;
  this.members = members;
  this.endAt = endAt;
  this.isDone = isDone;
}

export default Project;