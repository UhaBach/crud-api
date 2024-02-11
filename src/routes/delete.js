import storage from "../model/storage.js";
import { validate } from "uuid";
import { parse } from "querystring";
import { invalidId, notFound } from "../utils/utils.js";

export function deleteUser(userId, res){
    try{
        let checkId = validate(userId);
        if (!checkId) return invalidId(res);

        let user = storage.deleteUser(userId);
        if (!user) return notFound(res);

        res.statusCode = 204;
        res.end(); //`User ${user.id} was deleted.`
    } catch(err) {
        res.statusCode = 500;
        res.end(`Internal Server Error. ${err.message}`);
    }
}