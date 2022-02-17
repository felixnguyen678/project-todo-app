const { handleResponse } = require('./helpers')
const { handleError } = require('../helpers')
const {Task} = require('./../models')

function getTaskById(request, response) {
    const _id = request.body.id;
    Task.find({_id}).then(data => {
      response.end(JSON.stringify(data[0]))
    })
      .catch(err => {
        handleError(err, 'controllers/index.js', 'addTask')
        handleResponse(response, false)
      })
}

function getUndoneTasks(request, response) {
  const isDone = request.body.isDone;
  Task.find({isDone}).then(data => {
    response.end(JSON.stringify(data))
  })
    .catch(err => {
      handleError(err, 'controllers/index.js', 'addTask')
      handleResponse(response, false)
    })
}
function getTaskByOwner(request, response) {
  const owner = request.body.owner;
  Task.find({owner}).then(data => {
    response.end(JSON.stringify(data))
  })
    .catch(err => {
      handleError(err, 'controllers/index.js', 'addTask')
      handleResponse(response, false)
    })
}
function getAllTasks(request, response) {
  Task.find().then(data => {
    response.end(JSON.stringify(data))
  })
    .catch(err => {
      handleError(err, 'controllers/index.js', 'addTask')
      handleResponse(response, false)
    })
}


function editTask(request, response) {
    const task = request.body
    Task.findByIdAndUpdate(task.id, {...task})
        .then((editedTask) => {
            handleResponse(response, true)
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'editTask')
            handleResponse(response, false)
        })
}

function deleteTask(request, response) {
    const task = request.body
    Task.remove({ _id: task.id })
        .then((deletedTask) => {
            handleResponse(response, true)
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'deleteTask')
            handleResponse(response, false)
        })
}

function addTask(request, response) {
    const task = request.body
    Task.create(task)
        .then((insertedTask) => {
            handleResponse(response, true)
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'addTask')
            handleResponse(response, false)
        })
}

module.exports = {
    getTaskById,
    getTasks: getAllTasks,
    addTask,
    editTask,
    deleteTask,
}