const mongoose= require("mongoose");

const Admin=mongoose.model('Admin',{
    username:{
        type:String
    },
    password: {
        type:String
    }
})

module.exports=Admin;