const jwt = require('jsonwebtoken')
const { handleResponse, findTask, insertTask, updateTask, removeTask } = require('./helpers')
const { handleError } = require('../helpers')

function getTaskById(request, response) {
    const _id = request.body.id;
    findTask({_id}).then(data => {
      response.end(JSON.stringify(data))
    })
      .catch(err => {
        handleError(err, 'controllers/index.js', 'addTask')
        handleResponse(response, false)
      })
}
function getUndoneTasks(request, response) {
  const isDone = request.body.isDone;
  findTask({isDone}).then(data => {
    response.end(JSON.stringify(data))
  })
    .catch(err => {
      handleError(err, 'controllers/index.js', 'addTask')
      handleResponse(response, false)
    })
}
function getTaskByOwner(request, response) {
  const owner = request.body.owner;
  findTask({owner}).then(data => {
    response.end(JSON.stringify(data))
  })
    .catch(err => {
      handleError(err, 'controllers/index.js', 'addTask')
      handleResponse(response, false)
    })
}
function getAllTasks(request, response) {
  findTask().then(data => {
    response.end(JSON.stringify(data))
  })
    .catch(err => {
      handleError(err, 'controllers/index.js', 'addTask')
      handleResponse(response, false)
    })
}


function editTask(request, response) {
    const task = request.body
    updateTask(task)
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
    removeTask(task)
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
    insertTask(task)
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