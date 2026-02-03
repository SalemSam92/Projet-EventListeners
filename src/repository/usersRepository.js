import { User } from "../models/users.js";
import bcrypt from "bcrypt"



export async function userRegister(lastname, firstname, mail, password) {
    try {
        const passwordHash = await bcrypt.hash(password,10)
        const user = new User({ lastname, firstname, mail, password :passwordHash })
        user.save()
    } catch (error) {
        console.error(error)
        res.json({ ok: false })
    }
} 



export async function getUserByMail({ mail}) {
    const userLogin = await User.findOne({mail})

    if (!userLogin) {
     throw new Error("Adresse mail introuvable");    
    }
    return userLogin

} 

export async function getAllUser() {
    return await User.find()
}  