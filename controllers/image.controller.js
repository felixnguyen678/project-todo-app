const { handleError } = require('../helpers')
const {findTask, handleResponse} = require("./helpers");

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