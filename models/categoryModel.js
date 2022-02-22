const mongoose = require("mongoose")

const Category= new mongoose.Schema({
    cname: 
    {type:String},
    cimage:
    {type:String}
    
})

module.exports= mongoose.model("Category", Category);