const { handleError } = require('../helpers')

function parseRequestBody(request) {
  console.log('parse-body-request')
  try {
    return new Promise((resolve, reject) => {
      const chunks = []
      request
        .on('data', (chunk) => {
          chunks.push(chunk)
        })
        .on('end', () => {
          const data = JSON.parse(chunks.length > 0 ? chunks : '{}')
          request.body = data
          console.log('requestbody', request.body)
          resolve();
        })        
    })
  } catch (err) {
    if (!err.message) {
      handleError(err, 'middlewares/parse-request-body.js', 'parseRequestBody')
    }
    const message = err.message || 'Invalid request!'
    res.statusCode = 400
    res.end(message)
  }
}

module.exports = parseRequestBody