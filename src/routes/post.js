import storage from "../model/storage.js";
import { parse } from "querystring";
import { invalidAge, invalidId, noRequiredProperty, notFound, parseRequestBody } from "../utils/utils.js";

export function createUser(req, res){
    try{
        let body = "";
        req.on("data", chunk => {
            body = chunk.toString();
        });
        req.on("end", () => {
            body = parseRequestBody(res, body);
            if (body) {
                body.age = Number(body.age);
                let user = storage.createUser(body.username, body.age, body.hobbies);
                res.statusCode = 201;
                console.log(user);
                res.end(JSON.stringify(user));
            }
        });
    } catch(err){
        res.statusCode = 500;
        res.end(`Internal Server Error. ${err.message}`);
    }
}