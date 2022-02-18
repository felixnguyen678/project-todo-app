const crypto = require('crypto')
const { User, Task } = require('../models')
const {headers} = require("../helpers");
function insertUser(user) {
    const password = user.password ? hashPassword(user.password) : undefined
    const newUser = {...user, password}
    return User.create(newUser)
}

function verifyUser(checkingUser) {
    const signingInUser = {
        ...checkingUser,
        password: hashPassword(checkingUser.password)
    }
    return User.findOne(signingInUser)
}

function handleResponse(response, isSuccessful = false) {
    const data = {
        status: isSuccessful ? 'success' : 'fail'
    }
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Max-Age', 2592000);
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(data));
}

function hashPassword(password) {
    // const hmac = crypto.createHmac('sha256', 'Sup3r_s3cr3t_k3yyyy');
    const hash = crypto.createHash('sha256')
    return hash.update(password).digest('hex')
}

module.exports = { insertUser, verifyUser, handleResponse}