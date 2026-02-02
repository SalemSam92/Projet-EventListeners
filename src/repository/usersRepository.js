import { User } from "../models/users.js";

export async function createUser(lastname,firstname,mail,password){
    try {
        const user = new User({lastname,firstname,mail})
    } catch (error) {
        
    }
}