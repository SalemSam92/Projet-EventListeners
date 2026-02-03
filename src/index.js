import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routers/UserRouter.js";
import cors from "cors";

mongoose.connect(process.env.DATABASE_URL)
mongoose.set("strictQuery", true)

const app = express()
app.use(cors())
app.use(express.json()) 
app.use(userRouter)


app.listen(process.env.PORT, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.log("Serveur demarrer")

    }
});

