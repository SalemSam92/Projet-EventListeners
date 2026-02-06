import { getAllUser, getUserByMail, userRegister } from "../repository/usersRepository.js"
import bcrypt from "bcrypt"

export async function RegisterUser(req, res) {
    try {
        const { lastname, firstname, mail, password } = req.body

        if (!mail || !password) {
            return res.status(400).json({ ok: false, message: "Erreur enregistrment" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await userRegister(lastname, firstname, mail, hashedPassword);
        return res.status(201).json({
            ok: true, message: "compte créé",
            user: { lastname, firstname, mail }
        });
    
    } catch (error) {
        console.error("erreur d'enregistrement", error);
        return res.status(500).json({ ok: false })
    }
}
export async function loginUser(req, res) {
    try {
        const { mail, password } = req.body

        const userLogin = await getUserByMail({ mail })

        if (!userLogin) {
            throw new Error("Erreur adresse e-mail");
        }

        const passwordValide = await bcrypt.compare(password, userLogin.password)

        if (!passwordValide) {
            throw new Error("Erreur mot de passe");
        }


        res.json({
            ok: true,
            message: "Connexion réussi",
            id: userLogin._id,
            mail: userLogin.mail,
            firstname: userLogin.firstname,
            role : userLogin.role || "user"


        });

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