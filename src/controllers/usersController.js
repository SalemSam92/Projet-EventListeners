import { getAllUser, getUserByMailAndPassword, userRegister } from "../repository/usersRepository.js"
import bcrypt from "bcrypt"

export async function RegisterUser(req, res) {
    try {

        const newUser = req.body

         await userRegister(newUser.lastname, newUser.firstname, newUser.mail, newUser.password)
         if (newUser.mail) {
            throw new Error("compte existant");
            
         }
        res.json(newUser)
    } catch (error) {
        console.error(error)
        res.json({ ok: false })
    }
}
export async function loginUser(req, res) {
    try {


        const { mail, password } = req.body

        const userLogin = await getUserByMailAndPassword({ mail })

        if (!userLogin) { 
            throw new Error("mauvaise email");
            
        }
      
        const passwordValide = await bcrypt.compare(password,userLogin.password)

        if (!passwordValide) {
                 throw new Error("mauvaise mdp"); 
        }

        res.json({ok:true,
            message : "Connexion réussi",
            id : userLogin._id,
            mail : userLogin.mail,
            firstname : userLogin.firstname

        })


    } catch (error) {
        console.error(error)
        res.json({ message: "echec conexion" })
    }
}
export async function displayUser(req, res) {
    try {
        const users = await getAllUser()
        res.json(users)

    } catch (error) {
        console.error(error)
        res.json({ ok: false })
    }
}