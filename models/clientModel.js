const mongoose= require("mongoose");


const Client=mongoose.model('Client',{
    username:{
        type:String
    },
    password: {
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    image:{
        type:String
    },
    

})

module.exports=Client;