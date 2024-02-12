import config from "dotenv/config";
import { getAllUsers, getUserById } from "./get.js";
import { createUser } from "./post.js";
import { editUser } from "./put.js";
import { deleteUser } from "./delete.js";
import { unhandledEndpoint, unhandledHttpMethod } from "./unhandled.js";

const baseUrl = process.env.BASE_URL;

const routes = [
    baseUrl + "/users" // route /api/users
];

export function requestsHandler(req, res){
    const userId = req.url.split("/")[3];
    // console.log(req.method);
    // console.log(req.url);
    switch(req.method){
        case "GET":
            switch(req.url){
                case "/":
                case baseUrl:
                case routes[0]:
                    getAllUsers(res);
                    break;
                case `${routes[0]}/${userId}`:
                    getUserById(userId, res);
                    break;
                default:
                    unhandledEndpoint(req, res);
                    break;
            }
            break;
        case "POST":
            switch(req.url){
                case routes[0]:
                    createUser(req, res);
                    break;
                default:
                    unhandledEndpoint(req, res);
                    break;
            }
            break;
        case "PUT":
            switch(req.url){
                case `${routes[0]}/${userId}`:
                    editUser(userId, req, res);
                    break;
                default:
                    unhandledEndpoint(req, res);
                    break;
            }
            break;
        case "DELETE":
            switch(req.url){
                case `${routes[0]}/${userId}`:
                    deleteUser(userId, res);
                    break;
                default:
                    unhandledEndpoint(req, res);
                    break;
            }
            break;
        default:
            unhandledHttpMethod(req, res);
            break;
    }
}