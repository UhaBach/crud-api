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
        try{
            let user = new User(name, age, this.checkHobbies(hobbies));
            this.users.push(user);
            return user;
        } catch(err) {
            throw new Error("Error creating user. Please try again.");
        }
        
    };
    editUser = (userId, name, age, hobbies) => {
        try{
            let index = this.users.findIndex(u => u.id === userId);
            if (index === -1) return null;
            if(name) this.users[index].username = name;
            if(age) this.users[index].age = age;
            if(hobbies) {
                this.users[index].hobbies = this.checkHobbies(hobbies);
            }
            return this.users[index];
        } catch {
            throw new Error("Error editing user. Please try again.");
        }
    };
    deleteUser = (userId) => {
        try{
            let index = this.users.findIndex(u => u.id === userId);
            if (index === -1) return null;
            return this.users.splice(index, 1);
        } catch {
            throw new Error("Error deleting user. Please try again.");
        }
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