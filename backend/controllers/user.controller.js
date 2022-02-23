const jwt = require('jsonwebtoken')
const { insertUser, verifyUser, handleResponse, signUpUser} = require('./helpers')
const { handleError, getPathnameArrayFromRequest, getQueryParams} = require('../helpers')
const {Project} = require("./../models");
const User = require("../models/user");

function signUp(request, response) {
    const user = request.body
    signUpUser(user)
        .then((insertedUser) => {
            console.log('Log: signUp -> insertedUser', insertedUser)
            handleResponse(response, true)
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'signUp')
            handleResponse(response, false)
        })
}

function signIn(request, response) {
    const user = request.body
    response.setHeader('Content-Type', 'application/json');
    verifyUser(user).then(foundUser => {
        if (!foundUser) {
            throw new Error('User not found')
        }
        const token = jwt.sign({ username: foundUser.username},
            'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
        )
        const data = {
            token
        }
        response.end(JSON.stringify(data));
    }).catch(err => {
        handleError(err, 'controllers/index.js', 'signIn')
        response.statusCode = 404
        response.end('Username or password is not correct.')
    })
}

function getMe(req, res) {
    try {
        if (!req.headers.authorization) {
          throw new Error('Invalid token.')
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const { username} = decodedToken;
        User.find({username}).then(data => {
          if (data.length === 0) {
            throw new Error('Invalid token.')
          }
          res.end(JSON.stringify(data[0]));
        })
      } catch (err) {
        if (!err.message) {
          handleError(err, 'controllers/user.controller.js', 'getMe')
        }
        const message = err.message || 'Invalid request!'
        res.statusCode = 401
        res.end(message)
      }
}


function getUserByUsername(request, response) {
    const username = getPathnameArrayFromRequest(request)[1];
    User.find({username}).then(data => {
        response.end(JSON.stringify(data[0]))
    })
      .catch(err => {
          handleError(err, 'controllers/index.js', 'addTask')
          handleResponse(response, false)
      })
}

function getUsers(request, response) {
    const filter = getQueryParams(request);
    User.find(filter).then(data => {
        response.end(JSON.stringify(data))
    })
      .catch(err => {
          handleError(err, 'controllers/index.js', 'addTask')
          handleResponse(response, false)
      })
}


function updateUserByUsername(request, response) {
    const username = getPathnameArrayFromRequest(request)[1];
    const updateInformation = request.body
    User.findOneAndUpdate({username}, {...updateInformation})
      .then((editedTask) => {
          handleResponse(response, true)
      })
      .catch(err => {
          handleError(err, 'controllers/index.js', 'editTask')
          handleResponse(response, false)
      })
}

function deleteUserByUsername(request, response) {
    const username = getPathnameArrayFromRequest(request)[1];
    User.remove({ username })
      .then((deletedTask) => {
          handleResponse(response, true)
      })
      .catch(err => {
          handleError(err, 'controllers/index.js', 'deleteTask')
          handleResponse(response, false)
      })
}

function addUser(request, response) {
    const user = request.body
    insertUser(user)
      .then((insertedTask) => {
          handleResponse(response, true)
      })
      .catch(err => {
          handleError(err, 'controllers/index.js', 'addTask')
          handleResponse(response, false)
      })
}

module.exports = {
    signUp,
    signIn,
    getUsers,
    getUserByUsername,
    addUser,
    updateUserByUsername,
    deleteUserByUsername,
    getMe
}