const member = mongoose.Schema({

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
        required : [true, "E-mail obligatoire"]
    },
    password : {
        type : String,
      
    },
    events : {
        type : Array,
        id_events:{
            type : String
        }

    }
})

export const Member = mongoose.model("member",member)