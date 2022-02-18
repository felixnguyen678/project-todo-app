const { handleResponse } = require('./helpers')
const { handleError, getPathnameArrayFromRequest, getQueryParams} = require('../helpers')
const {Task} = require('./../models')
const url = require("url");

function getTaskById(request, response) {
    const _id = getPathnameArrayFromRequest(request)[1];
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
function getTasks(request, response) {
  const filter = getQueryParams(request);
  Task.find(filter).then(data => {
    response.end(JSON.stringify(data))
  })
    .catch(err => {
      handleError(err, 'controllers/index.js', 'addTask')
      handleResponse(response, false)
    })
}


function updateTaskById(request, response) {
    const _id = getPathnameArrayFromRequest(request)[1];
    const updateInformation = request.body
    Task.findByIdAndUpdate(_id, {...updateInformation})
        .then((editedTask) => {
            handleResponse(response, true)
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'editTask')
            handleResponse(response, false)
        })
}

function deleteTask(request, response) {
    const _id = getPathnameArrayFromRequest(request)[1];
    Task.remove({ _id})
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
    getTasks: getTasks,
    addTask,
    editTask: updateTaskById,
    deleteTask,
}