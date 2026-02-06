console.log("event.routes.js chargé");

import express from "express";
import {
  getAllOrSearch,
  getById,
  create,
  update,
  drop,
  unregister,
  inscrireevenement
} from "../controllers/eventsController.js";

const eventRouter = express.Router();

eventRouter.get("/", getAllOrSearch);
eventRouter.get("/:id", getById);
eventRouter.post("/", create,);
eventRouter.patch("/register/:id", inscrireevenement);
eventRouter.patch("/unregister/:id", unregister);
eventRouter.patch("/:id", update);
eventRouter.delete("/:id", drop);

export default eventRouter;