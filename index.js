import http from "node:http";
import config from "dotenv/config";
import { requestsHandler } from "./src/routes/handler.js";

const server = http.createServer();

server.on("request", (req, res) => {
    requestsHandler(req, res);
});

server.listen(process.env.PORT, err => {
    err ? comsole.log(err.message) : console.log(`Listening on port ${process.env.PORT}`);
});