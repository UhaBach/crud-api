import { validate } from "uuid";
import { parse } from "querystring";

export function invalidId(res){
    res.statusCode = 400;
    res.end("Invalid ID. Please make sure the ID is in uuid format.");
}

export function notFound(res){
    res.statusCode = 404;
    res.end("User not found.");
}

export function noRequiredProperty(res){
    res.statusCode = 400;
    res.end("The request body does not contain one or more required fields (username, age, hobbies)." + 
        "\nCheck the spelling of the request body and try again.");
}

export function invalidAge(res){
    res.statusCode = 400;
    res.end("The age property is not a number. Please check that the age property is correct and try again.");
}

export function parseRequestBody(res, body){
    body = parse(body);
    console.log(body);
    if (
        !Object.hasOwn(body, "username") 
        || !Object.hasOwn(body, "age") 
        || !Object.hasOwn(body, "hobbies")
    ) return noRequiredProperty(res);

    body.age = Number(body.age);
    if (!Number.isInteger(body.age)) return invalidAge(res);
    return body;
}