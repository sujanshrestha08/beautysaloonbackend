const express = require("express");
const router = new express.Router();
const Admin = require("../models/adminModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")


// register route for admin
router.post("/admin/register", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;


    Admin.findOne(
            { username: username }
    )
        .then(function (AdminData) {
            if (AdminData != null) {
                res.status(401).json({ msg: "Username Already Exists. Try some other name" })
            }
            else {
                bcryptjs.hash(password, 10, function (e, hashed_password) {
                    const adminData = new Admin({
                        username: username,
                        password: hashed_password,
                     
                    })
                    adminData.save()
                        .then(function(){
                            res.json({msg: "User Registered!"})
                        })
                        .catch(function(error){
                            res.json(error);
                        });
                })
            }
        })
})
    // login route for admin
router.post('/admin/login', function(req,res){
    const username= req.body.username; 
    console.log(req.body)
    Admin.findOne({username:username})
     .then(function(AdminData){
        if (AdminData===null){
            return res.json({msg: "Admin Invalid login credentials"})
        }
         /// now if username is valid
        const password= req.body.password;  // postman le patahyeko pw
        //  console.log(password);
        bcryptjs.compare(password,AdminData.password, function(err,result){ // 1st client le pathayeko(postman) 2nd database ma bhayeko 
            if(result===false){
                return res.json({msg:"Invalid Admin Credentials!"})
            }
            /// correct condition generating token
            const token12= jwt.sign({adminId: AdminData._id},"mysecretkey");  //jwt.sign bhaneko toke banaideu
            
            res.json({token:token12, msg:" Admin Auth Success"})

        })
     })
     .catch(function(e){
         res.json({"msg":"Some error occured"})
     }) 
})





module.exports = router;