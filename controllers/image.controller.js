const { handleError } = require('../helpers')
const {findTask, handleResponse} = require("./helpers");
const fs = require("fs");
const path = require('path');

function getImage(request, response) {
    fs.readFile(path.join(__dirname, '../', 'public', 'images', 'img.png'), function (err, data) {
      if (err) throw err; // Fail if the file can't be read.
      response.writeHead(200, { "Content-Type": "image/png" });
      response.end(data); // Send the file data to the browser.
    });
  };

module.exports = {getImage};