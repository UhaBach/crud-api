import { User } from "./user.js"

class Storage {
    count = 0;
    users = [];
    getUser = (userId) => {
        if(userId){
            return this.users.find(u => u.id === userId);
        }
        else {
            return this.users;
        }
    }
    createUser = (name, age, hobbies) => {
        let user = new User(name, age, hobbies);
        this.users.push(user);
        return user;
    }
}

let storage = new Storage();

export default storage;