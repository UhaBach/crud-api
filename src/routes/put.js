import storage from "../model/storage.js";
import { validate } from "uuid";
import { parse } from "querystring";

export function editUser(userId, req, res){
    let checkId = validate(userId);
    if (!checkId) {
        res.statusCode = 400;
        res.end("Invalid ID. Please make sure the ID is in uuid format.");
        return;
    }
    let body = "";
    req.on("data", chunk => {
        body = chunk.toString();
    });
    req.on("end", () => {
        body = parse(body);
        body.age = Number(body.age);
        if (!Number.isInteger(body.age)){
            res.statusCode = 400;
            res.end("The age property is not a number. Please check that the age property is correct and try again.");
            return;
        }
        let user = storage.editUser(userId, body.username, body.age, body.hobbies);
        if (!user) {
            res.statusCode = 404;
            res.end("User not found.");
            return;
        }
        res.statusCode = 200;
        res.end(JSON.stringify(user));
    });
}