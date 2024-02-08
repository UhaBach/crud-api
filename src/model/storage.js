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
    };
    createUser = (name, age, hobbies) => {
        let user;
        if (Array.isArray(hobbies)) {
            user = new User(name, age, hobbies);
            this.users.push(user);
            return user;
        }
        else {
            let hobbiesArr = [hobbies];
            user = new User(name, age, hobbiesArr);
            this.users.push(user);
            return user;
        }
    };
    editUser = (userId, name, age, hobbies) => {
        let index = this.users.findIndex(u => u.id === userId);
        if (index === -1) return null;
        if(name) this.users[index].username = name;
        if(age) this.users[index].age = age;
        if(hobbies) {
            if (Array.isArray(hobbies)) {
                this.users[index].hobbies = hobbies;
            }
            else {
                let hobbiesArr = [hobbies];
                this.users[index].hobbies = hobbiesArr;
            }
        }
        return this.users[index];
    }
}

let storage = new Storage();

export default storage;