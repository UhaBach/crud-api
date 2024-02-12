import storage from "../model/storage.js";
import { validate } from "uuid";
import { invalidAge, invalidId, noRequiredProperty, notFound } from "../utils/utils.js";

export function getAllUsers(res){
    let users = storage.getUser(null);
    res.statusCode = 200;
    res.end(JSON.stringify(users));
}

export function getUserById(userId, res){
    let checkId = validate(userId);
    if (!checkId) return invalidId(res);

    let user = storage.getUser(userId);
    if (!user) return notFound(res);
    
    res.statusCode = 200;
    res.end(JSON.stringify(user));
}