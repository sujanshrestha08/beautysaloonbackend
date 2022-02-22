const mongoose= require ("mongoose");

const Package= new mongoose.Schema({
    // aid:{type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Admin'},

    pname:{type: String},
    pimage:{type:String},
    pdescription:{type:String},
    pprice:{type:Number},
    pduration:{type:String},
   
    
})

module.exports= mongoose.model("Package",Package);