function Project(_id, projectId, projectName, members, createdAt, finishedAt) {
  this._id = _id;
  this.projectId = projectId;
  this.projectName = projectName;
  this.createdAt = createdAt;
  this.members = members;
  this.finishedAt = finishedAt;
}

export default Project;