const mongoose= require ("mongoose");

const Appointment= new mongoose.Schema({
     
    adate:{type:Date},
    atime:{type:String},
    service: [{
        type:mongoose.Schema.Types.ObjectId, ref: 'Service'}],
    cid: {type:mongoose.Schema.Types.ObjectId, ref: 'Client'},
    
    
})

module.exports= mongoose.model("Appointment",Appointment);