import mongoose from "mongoose";

const eventsSchema = mongoose.Schema({
  titre: {
    type: String,
    required: [true, "Le titre de l'évenement est obligatoire"],
  },
  description: {
    type: String,
  },
  lieu: {
    type: String,
    required: [true, "le lieu doit être renseigné"],
  },
  date: {
    type: Date,
    required: [true, "La date doit être renseignée"],
  },
  nbPlace: {
    type: Number,
    required: [true, "Le nombre maximal de places doit être renseigné"],
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
});

export const Events = mongoose.model("events", eventsSchema);