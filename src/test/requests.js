import http from "http";
import { stringify, parse } from "querystring";

export async function getAllUsers(){
    return await sendRequest("GET", "/api/users");
}

export async function createUser(){
    return await sendRequest("POST", "/api/users");
}

export async function getConcreteUser(userId){
    return await sendRequest("GET", `/api/users/${userId}`);
}

async function sendRequest(method, url){
    const userId = url.split("/")[3];
    return new Promise((resolve, reject) => {
        let request;
        const base = "http://localhost:3000"
        switch(method){
            case "GET":
                request = http.get(base + url, (res) => {
                    if(res.statusCode < 200 || res.statusCode > 299) {
                        return reject(new Error(`HTTP status code ${res.statusCode}`));
                    }
                    const body = [];
                    res.on('data', (chunk) => body.push(chunk));
                    res.on('end', () => {
                        const resString = JSON.parse(Buffer.concat(body).toString());
                        resolve(resString);
                    });

                    request.on('error', (err) => {
                        reject(err)
                    });
                    request.on('timeout', () => {
                        request.destroy()
                        reject(new Error('timed out'))
                    });
                });
                break;
            case "POST":
                const path = new URL(base + url);
                const options = {
                    method: "POST"
                };
                const postData = {
                    username: "Oleg",
                    age: 70,
                    hobbies: [
                        "reading",
                        "gaming"
                    ]
                };
                request = http.request(path, options, (res) => {
                    if(res.statusCode < 200 || res.statusCode > 299) {
                        return reject(new Error(`HTTP status code ${res.statusCode}`));
                    }

                    const body = [];
                    res.on('data', (chunk) => body.push(chunk));
                    res.on('end', () => {
                        const resString = JSON.parse(Buffer.concat(body).toString());
                        resolve(resString);
                    });

                    request.on('error', (err) => {
                        reject(err)
                    });
                    request.on('timeout', () => {
                        request.destroy()
                        reject(new Error('timed out'))
                    });
                    
                });
                request.write(stringify(postData));
                setTimeout(()=>{}, 1000);
                request.end();
                break;
            default:
                reject(new Error("Unknown HTTP method"));
                break;
        }
    });
}