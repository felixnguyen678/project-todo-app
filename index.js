const http = require("http");
const mongoose = require("mongoose");
const router = require("./router");

const port = 8080;

const server = http.createServer((request, response) => {
    const controller = router.route(request);
    controller(request, response);
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

mongoose.connect('mongodb+srv://root:12345ABC@cluster0.az6sc.mongodb.net/test\n', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we are connected!')
});