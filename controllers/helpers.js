const crypto = require('crypto')
const { User, Task } = require('../models')

function insertUser(user) {
    const password = user.password ? hashPassword(user.password) : undefined
    const newUser = {
        username: user.username,
        password
    }
    return User.create(newUser)
}

function verifyUser(checkingUser) {
    const signingInUser = {
        ...checkingUser,
        password: hashPassword(checkingUser.password)
    }
    return User.findOne(signingInUser)
}

function handleAuthResponse(response, isSuccessful = false) {
    const data = {
        status: isSuccessful ? 'success' : 'fail'
    }
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(data));
}

function findTask(id) {
    return Task.find({ owner: id })
}

function insertTask(task) {
    const newTask = {
        taskName: task.taskName,
        isDone: "false",
        owner: task.owner
    }
    return Task.create(newTask)
}

function updateTask(task) {
    return Task.findByIdAndUpdate(task.id, { taskName: task.taskName })
}

function removeTask(task) {
    return Task.remove({ _id: task.id })
}

function hashPassword(password) {
    // const hmac = crypto.createHmac('sha256', 'Sup3r_s3cr3t_k3yyyy');
    const hash = crypto.createHash('sha256')
    return hash.update(password).digest('hex')
}

module.exports = { insertUser, verifyUser, handleAuthResponse, findTask, insertTask, updateTask, removeTask }