import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

mongoose.connect(process.env.DATABASE_URL)
mongoose.set("strictQuery", true)

const app = express()
app.use(express.json()) 


app.listen(process.env.PORT, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.log("Serveur demarrer")

    }
});

