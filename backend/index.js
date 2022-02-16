const http = require("http");
const mongoose = require("mongoose");
const router = require("./router");

const port = 8080;

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
    "Access-Control-Allow-Headers": "Content-Type",
};

const server = http.createServer((request, response) => {
    //response.writeHead(200, headers);
    const controller = router.route(request);
    controller(request, response);
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

mongoose.connect('mongodb+srv://bean:12345ABC@cluster0.pzr7l.mongodb.net/test\n', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we are connected!')
});