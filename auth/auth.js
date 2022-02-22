const jwt= require("jsonwebtoken");
const Client= require("../models/clientModel");
const Admin= require("../models/adminModel");
const Category= require("../models/categoryModel");

module.exports.verifyClient= function(req,res,next){
  try{
    const token= req.headers.authorization.split(" ")[1];
    const data= jwt.verify(token, "mysecretkey");
    // console.log(data.clientId);
    Client.findOne({_id: data.clientId})
    .then(function(result){
        //save the details of logged in customer info
        req.clientInfo=result;
        next();
        // console.log(result)
    })
    .catch(function(){
        res.send({msg:"invalid token"})
    })

  }
  catch(e){
      res.send({msg:"invalid token"})
}
}


module.exports.verifyAdmin= function(req,res,next){
    try{
        console.log("config ", req.headers)
      const token= req.headers.authorization.split(" ")[1];
      const data= jwt.verify(token, "mysecretkey");
      console.log(data.adminId);
      Admin.findOne({_id: data.adminId})
      .then(function(result){
          req.adminInfo=result;
          next();
          console.log(result)
      })
      .catch(function(){
          res.send({msg:"invalid token"})
      })
  
    }
    catch(e){
        res.send({msg:"invalid token"})
  }
  }

  