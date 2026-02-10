import { User } from "../models/users.js";
//bycript retiré car deja présent


export async function userRegister(lastname, firstname, mail, password) {
    try {
        
        const user = new User({ lastname, firstname, mail, password })
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