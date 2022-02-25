const { handleResponse } = require('./helpers')
const { handleError, getPathnameArrayFromRequest, getQueryParams} = require('../helpers')
const {Project} = require('./../models')
const url = require("url");

function getProjectByById(request, response) {
  const projectId = getPathnameArrayFromRequest(request)[1];
  Project.find({projectId}).then(data => {
    response.end(JSON.stringify(data[0]))
  })
    .catch(err => {
      handleError(err, 'controllers/index.js', 'addTask')
      handleResponse(response, false)
    })
}

function getProjects(request, response) {
  const filter = getQueryParams(request);
  Project.find(filter).then(data => {
    response.end(JSON.stringify(data))
  })
    .catch(err => {
      handleError(err, 'controllers/index.js', 'addTask')
      handleResponse(response, false)
    })
}


function updateProjectById(request, response) {
  const projectId = getPathnameArrayFromRequest(request)[1];
  const updateInformation = request.body
  Project.findOneAndUpdate({projectId}, {...updateInformation})
    .then((editedTask) => {
      handleResponse(response, true)
    })
    .catch(err => {
      handleError(err, 'controllers/index.js', 'editTask')
      handleResponse(response, false)
    })
}

function deleteProjectById(request, response) {
  const projectId = getPathnameArrayFromRequest(request)[1];
  Project.remove({ projectId })
    .then((deletedTask) => {
      handleResponse(response, true)
    })
    .catch(err => {
      handleError(err, 'controllers/index.js', 'deleteTask')
      handleResponse(response, false)
    })
}

function addProject(request, response) {
  const project = request.body
  console.log('project', project);
  Project.create(project)
    .then((insertedTask) => {
      handleResponse(response, true)
    })
    .catch(err => {
      response.statusCode = 500;
      response.end('Internal Server Error')
    })
}

module.exports = {
  getProjectByById,
  getProjects,
  addProject,
  updateProjectById,
  deleteProjectById,
}