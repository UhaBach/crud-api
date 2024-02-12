import storage from "../model/storage.js";
import { validate } from "uuid";
import { parse } from "querystring";
import { invalidAge, invalidId, noRequiredProperty, notFound, parseRequestBody } from "../utils/utils.js";

export function editUser(userId, req, res){
    try{
        let checkId = validate(userId);
        if (!checkId) return invalidId(res);

        let body = "";
        req.on("data", chunk => {
            body = chunk.toString();
        });
        req.on("end", () => {

            body = parseRequestBody(res, body);
            if (body) {
                body.age = Number(body.age);
                let user = storage.editUser(userId, body.username, body.age, body.hobbies);
                if (!user) return notFound(res);

                res.statusCode = 200;
                res.end(JSON.stringify(user));
            }
        });
    } catch(err) {
        res.statusCode = 500;
        res.end(`Internal Server Error. ${err.message}`);
    }
}