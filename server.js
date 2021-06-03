const http = require("http");
const app = require("./app");
const port  = process.env.port || 4000;

// start server
const server = http.createServer(app);

// listen to port
server.listen(port);