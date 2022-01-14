const jwt = require('jsonwebtoken')
const { insertUser, verifyUser, handleResponse} = require('./helpers')
const { handleError } = require('../helpers')

function signUp(request, response) {
    const user = request.body
    insertUser(user)
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
        const token = jwt.sign({ userId: foundUser.id },
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

module.exports = {
    signUp,
    signIn,
}