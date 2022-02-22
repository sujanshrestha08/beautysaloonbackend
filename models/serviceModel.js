const mongoose = require("mongoose")

const Service= new mongoose.Schema({
    sname: 
    {type:String},
    sduration:
    {type:String},
    sprice:
    {type:Number},
    sdescription:
    {type: String},
    simage:
    {type:String},
    cid:{type:mongoose.Schema.Types.ObjectId, ref: 'Category'}
    
})

module.exports= mongoose.model("Service", Service); //1st ko database ma hune name services bhayera bascha 2nd ko mathi service model ko name