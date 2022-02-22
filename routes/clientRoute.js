const express = require("express");
const router = new express.Router();
const bcryptjs = require("bcryptjs"); // helps bcryt the pw
const jwt = require("jsonwebtoken")    //helps to create token
const Client = require("../models/clientModel");
const auth = require("../auth/auth");
const upload = require("../file/file");
const req = require("express/lib/request");

//client registration 
router.post("/client/register", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;

    Client.findOne({
        $or:
            [{ username: username }, { email: email }]
    })
        .then(function (ClientData) {
            if (ClientData != null) {
                res.status(401).json({ msg: "Username Already Exists. Try some other name" })
            }
            else {
                bcryptjs.hash(password, 10, function (e, hashed_password) {
                    const clientData = new Client({
                        username: username,
                        password: hashed_password,
                        email: email,
                        phone: phone,
                        address: address
                    })
                    clientData.save()
                        .then(function () {
                            res.json({ message: "User Registered!" , status:1, success:true})
                        })
                        .catch(function (e) {
                            res.json(e);
                        });
                })
            }
        })
})

router.post("/test", function (req, res) {
    const username1 = req.body.username;
    Client.findOne({ username: username1 }).then(function (data) {
        if (data != null) {
            res.send("Username exists")
        }
        console.log(data);
    })
})

// login route for client
router.post('/client/login', function (req, res) {
    const username = req.body.username; //client le pathayeko
    Client.findOne({ username: username })//agadi ko model sanga pachadi ko client
        .then(function (ClientData) {
            if (ClientData === null) {
                return res.json({ msg: "Invalid login credentials" })
            } 
            /// now if username is valid
            const password = req.body.password;  // postman le patahyeko pw
            //  console.log(password);
            bcryptjs.compare(password, ClientData.password, function (err, result) { // 1st client le pathayeko(postman) 2nd database ma bhayeko 
                if (result === false) {
                    return res.json({ msg: "Invalid Credentials!" })
                }
                /// correct condition generating token
                const token12 = jwt.sign({ clientId: ClientData._id }, "mysecretkey");  //jwt.sign bhaneko toke banaideu

                res.json({ token: token12, msg: "Auth Success", success:true})

            })
        })
        .catch(function (e) {
            res.json(e)
        })
})

//for uploading image use this route
router.post("/client/profile", upload.single('user_image'), function (req, res) {  //user_image postman sanga milcha
    console.log(req.file);
    if (req.file === undefined) {
        return res.json({
            msg: "Invalid file format"
        })
    }
    else{
        res.send(`/${req.file.filename}`)
    }
})

router.get("/client",async function (req,res){
  const data=await  Client.find({})
  res.json(data)
})
//for client to view profile after logging in

router.get("/client/dashboard", auth.verifyClient, function (req, res) {
    Client.find({ cid: req.clientInfo._id})
    .then(function (){
        res.json({
            userData:{ 
                username: req.clientInfo.username,
                email: req.clientInfo.email,
                phone: req.clientInfo.phone,
                address: req.clientInfo.address,
                image: req.clientInfo.image,
            },
           
            
        }) 
    }). catch(function(err){
        res.status(400).json({success: false, message: "Unable to fetch data"})
    })
    // console.log(req.clientInfo);
   //send response to client
})

//profile update of client
router.put("/client/update", auth.verifyClient, function (req, res) {
    const username = req.body.username;
    const email= req.body.email;
    const phone= req.body.phone;
    const address = req.body.address;
    const password= req.body.password;
    const image=req.body.image;

    bcryptjs.hash(password, 10, function(e,hashed_password){
        
    Client.updateOne({ _id: req.clientInfo._id },
        {
            username: username,
            email:email,
            phone:phone,
            address: address,
            password:hashed_password,
            image:image
            
        })
        .then(function () {
            res.json({  msg: "Auth Success", success:true})
        })
        .catch(function (e) {
            res.json(e)
        })
        
    }
    )

})


module.exports = router;