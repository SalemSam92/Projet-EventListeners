import mongoose from "mongoose";

const events = mongoose.Schema({
  titre: {
    type: String,
    required: [true, "Le titre de l'évenement est obligatoire"],
  },
  description: {
    type: String,
  },
  lieu: {
    type: String,
    required: [true, "le lieu doit être rensigné "],
  },
  date: {
    type: Date,
    required: [true, "La date doit être reneignée"],
  },
  nbPlace: {
    type: Number,
    required: [true, "Le nombre maximal de places doit être renseigné"],
  },
  listeMembreInscrits : {
        type : Array,
        id_membre:{
            type : String
        }

    }
});
export const Events = mongoose.model("events", events);
