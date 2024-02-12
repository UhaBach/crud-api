import http from "node:http";
import config from "dotenv/config";
import { requestsHandler } from "./src/routes/handler.js";

const mode = process.env.Node_ENV;
let greeting = `Listening on port ${process.env.PORT}.\nRun mode: ${mode}.`;

const server = http.createServer();

server.on("request", (req, res) => {
    requestsHandler(req, res);
});

server.listen(process.env.PORT, err => {
    err ? comsole.log(err.message) : console.log(greeting);
});