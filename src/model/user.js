import { v4 } from "uuid";

export class User{
    id;
    username;
    age;
    hobbies = [];

    constructor(username, age, hobbies){
        this.id = v4();
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }
}