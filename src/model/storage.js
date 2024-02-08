import { User } from "./user.js"

class Storage {
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
        let user = new User(name, age, this.checkHobbies(hobbies));
        this.users.push(user);
        return user;
    };
    editUser = (userId, name, age, hobbies) => {
        let index = this.users.findIndex(u => u.id === userId);
        if (index === -1) return null;
        if(name) this.users[index].username = name;
        if(age) this.users[index].age = age;
        if(hobbies) {
            this.users[index].hobbies = this.checkHobbies(hobbies);
        }
        return this.users[index];
    };
    deleteUser = () => {
    };
    checkHobbies = (hobbies) => {
        if (Array.isArray(hobbies)) {
            return hobbies;
        }
        else {
            return [hobbies];
        }
    };
}

let storage = new Storage();

export default storage;