import mongoose from "mongoose";

const user = mongoose.Schema({

    lastname :{
        type :String,
        required :[true,"Nom obligatoire"]
    },

    firstname :{
        type : String,
        required : [true,"prénom obligatoire"]
    },

    mail : {
        type : String,
        required : [true, "E-mail obligatoire"],
        unique : [true,"Adresse e-mail existante"]
    },
    password : {
        type : String,
        required : [true,"Mot de passe obligatoire"]
    },
    role : {
        type : String,
        default: "membre"
    },
    events : {
        type : Array,
        id_events:{
            type : String
        }}
})

export const User = mongoose.model("users",user) 