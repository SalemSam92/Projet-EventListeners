import mongoose from "mongoose";

const events = mongoose.Schema({
    titre : {
        type : String,
        required : [true,"Titre de l'évenement obligatoire"]
    },
    description :{
        type : String,
        
    },
    lieu : {
        type : String,
        required : [true,"le lieu doit être rensigné "]
    },
    date : {
        type : Date,
        required :[true,"La date doit être reneigné "]
    },
    nbPlace : {
        type : Number,
        required : [true,"Le nombre de place doit être renseigné"]
    }
})
export const Events = mongoose.model("events",events)