import config from "dotenv/config";
import { getAllUsers, getUserById } from "./get.js";
import { createUser } from "./post.js";
import { editUser } from "./put.js";

const baseUrl = process.env.BASE_URL;

const routes = [
    baseUrl + "/users" // route /api/users
];

export function requestsHandler(req, res){
    const userId = req.url.split("/")[3];
    switch(req.method){
        case "GET":
            switch(req.url){
                case "/":
                case baseUrl:
                case routes[0]:
                    getAllUsers(req, res);
                    break;
                case `${routes[0]}/${userId}`:
                    getUserById(userId, req, res);
                    break;
                default:
                    break;
            }
            break;
        case "POST":
            switch(req.url){
                case routes[0]:
                    createUser(req, res);
                    break;
                default:
                    break;
            }
            break;
        case "PUT":
            switch(req.url){
                case `${routes[0]}/${userId}`:
                    editUser(userId, req, res);
                    break;
                default:
                    break;
            }
            break;
        case "DELETE":
            break;
        default:
            break;
    }
}