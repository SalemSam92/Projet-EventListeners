import express from "express"
import { displayUser, loginUser, RegisterUser } from "../controllers/usersController.js"


export const userRouter = express.Router()

userRouter.post("/inscription",RegisterUser)
userRouter.post("/login",loginUser) 
userRouter.get("/users",displayUser)

