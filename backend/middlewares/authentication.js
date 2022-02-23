const jwt = require('jsonwebtoken');
const { userRepository } = require('../repositories')
const { handleError } = require('../helpers');
const { User } = require('../models');


function authenticate(req, res) {

    try {
      if (!req.headers.authorization) {
        throw new Error('Invalid token.')
      }
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const { username} = decodedToken;
      return User.find({username}).then(data => {
        if (data.length === 0) {
          throw new Error('Invalid token.')
        }
      })
    } catch (err) {
      if (!err.message) {
        handleError(err, 'middlewares/authentication.js', 'authenticate')
      }
      const message = err.message || 'Invalid request!'
      res.statusCode = 401
      res.end(message)
    }
}

function adminAuthenticate(req, res) {
  try {
    if (!req.headers.authorization) {
      throw new Error('Invalid token.')
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const { username } = decodedToken;

    return User.find({username}).then(data => {
      if (data.length === 0) {
        throw new Error('Invalid token.')
      }
      if(data[0].role !== 'admin') {
        throw new Error('Invalid admin token.')
      }
    })
  } catch (err) {
    if (!err.message) {
      handleError(err, 'middlewares/authentication.js', 'adminAuthenticate')
    }
    const message = err.message || 'Invalid request!'
    res.statusCode = 401
    res.end(message)
  }
}


module.exports = {
  authenticate,
  adminAuthenticate
}