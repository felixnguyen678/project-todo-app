const http = require("http");
const mongoose = require("mongoose");
const router = require("./router");

const port = 3001;



const server = http.createServer((request, response) => {
    const controller = router.route(request, response);
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