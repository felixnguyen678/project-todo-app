const { handleError } = require('../helpers')
const {findTask, handleResponse} = require("./helpers");
const fs = require("fs");

function getTaskById(request, response) {
    fs.readFile("image.png", function (err, data) {
      if (err) throw err; // Fail if the file can't be read.
      response.writeHead(200, { "Content-Type": "image/png" });
      response.end(data); // Send the file data to the browser.
    });
  };
}