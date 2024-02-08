import storage from "../model/storage.js";
import { parse } from "querystring";

export function createUser(req, res){
    let body = "";
    req.on("data", chunk => {
        body = chunk.toString();
    });
    req.on("end", () => {
        body = parse(body);
        if (!Object.hasOwn(body, "username") || !Object.hasOwn(body, "age") || !Object.hasOwn(body, "hobbies")) {
            res.statusCode = 400;
            res.end("The request body does not contain one or more required fields (username, age, hobbies)." + 
                "\nCheck the spelling of the request body and try again.");
            return;
        }
        let user = storage.createUser(body.username, body.age, body.hobbies);
        res.statusCode = 201;
        res.end(JSON.stringify(user));
    });
    
}