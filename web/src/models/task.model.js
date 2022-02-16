function Task(taskId, taskName, owner, project, createdAt, isDone) {
  this.taskId = taskId;
  this.taskName = taskName;
  this.owner = owner;
  this.project = project;
  this.createdAt = createdAt;
  this.isDone = isDone;
}

export default Task;