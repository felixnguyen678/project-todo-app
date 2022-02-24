const jwt = require('jsonwebtoken');
const { userRepository } = require('../repositories')
const { handleError } = require('../helpers');
const { User } = require('../models');


function authenticate(req, res) {
  console.log('authenticate');
  return new Promise((resolve, reject) => {
    try {
      if (!req.headers.authorization) {
        reject();
      }
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const { username} = decodedToken;
      return User.find({username}).then(data => {
        if (data.length === 0) {
          reject();
        } else {
          resolve();
        }
      })
    } catch (err) {
      if (!err.message) {
        handleError(err, 'middlewares/authentication.js', 'authenticate')
      }
      const message = err.message || 'Invalid request!'
      reject()
    }
  })


}

function adminAuthenticate(req, res) {
  console.log('adminauthenticate')
  return new Promise ((resolve, reject) => {
    try {
      if (!req.headers.authorization) {
        reject();
      }
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const { username } = decodedToken;
  
      return User.find({username}).then(data => {
        if (data.length === 0) {
          reject();
  
        } else if(data[0].role !== 'admin') {
          reject();
        } else {
          resolve();
        }
      })
    } catch (err) {
      if (!err.message) {
        handleError(err, 'middlewares/authentication.js', 'adminAuthenticate')
      }
      reject();
    }
  })
  
}


module.exports = {
  authenticate,
  adminAuthenticate
}