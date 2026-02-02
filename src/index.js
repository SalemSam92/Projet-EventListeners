import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
//import des routes events
import eventRouter from "./routers/event.route.js";

mongoose.connect(process.env.DATABASE_URL);
mongoose.set("strictQuery", true);

const app = express();
app.use(express.json());
app.use(cors());
app.use("/events", eventRouter);

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Serveur demarrer");
  }
});
