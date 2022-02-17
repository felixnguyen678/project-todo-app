function Task(_id, taskName, owner, project, createdAt, isDone) {
  this._id = _id;
  this.taskName = taskName;
  this.owner = owner;
  this.project = project;
  this.createdAt = createdAt;
  this.isDone = isDone;
}

export default Task;