import storage from "../model/storage.js";
import { validate } from "uuid";

export function getAllUsers(req, res){
    let users = storage.getUser(null);
    res.statusCode = 200;
    res.end(JSON.stringify(users));
}

export function getUserById(userId, req, res){
    let checkId = validate(userId);
    if (!checkId) {
        res.statusCode = 400;
        res.end("Invalid ID. Please make sure the ID is in uuid format.");
        return;
    }
    let user = storage.getUser(userId);
    if (!user){
        res.statusCode = 404;
        res.end("User not found.");
        return;
    }
    res.statusCode = 200;
    res.end(JSON.stringify(user));
}