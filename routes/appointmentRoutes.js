const express= require("express");
const Appointment = require("../models/appointmentModel")

const router= new express.Router();
const auth = require("../auth/auth");

router.post("/appointment/insert", auth.verifyClient, function(req,res){

    const adate= req.body.adate;
    const atime= req.body.atime;
    const clientid= req.clientInfo._id;
    const service= req.body.service;
    
    const appointmentData= new Appointment({
        adate,
        atime,
        cid: clientid,  
        service,
    
    })
    appointmentData.save()
    .then(function(){
        res.status(200).json({msg:"Appointment Successful"})
    })
    .catch(function(error){
        res.status(500).json({msg:"Couldn't make appointment"});
    })


})

//updating appointment

router.put("/appointment/update", auth.verifyClient, function(req,res){
    const adate= req.body.adate;
    const atime= req.body.atime;
    const clientid= req.body.clientid;
    const cartid= req.body.cartid;
    const aid= req.body.aid;


    Appointment.updateOne({ _id: aid},
        {
            adate: adate,
            atime: atime,
            clientid: clientid,
            cartid:cartid,
            aid: aid

        })
        .then(function(){
            res.json("appointment updated successfully")
        })
        .catch(function (e){
            res.json("Sorry!!!\nCouldn't change appointment.")
        })
})


//view all of clients appointment
router.get("/appointment/view", auth.verifyAdmin, function (req, res) {

    Appointment.find().populate("service","sname sprice").populate("cid","username")
        .then(function (data) {
            res.json(data);
        })
        .catch(function () {
            res.json({ msg: "Something went wrong" })
        })
})

//view clients appointment by client itself

router.get("/appointment/client", auth.verifyClient, function (req, res) {
    Appointment.find({cid:req.clientInfo._id}).populate("service","sname sprice").populate("cid","username")
        .then(function (data) {
            res.json(data);
        })
        .catch(function () {
            res.json({ msg: "Something went wrong" })
        })

})


//canceling appointment
router.delete("/appointment/delete/:aid", auth.verifyClient, function (req, res) {
    const aid = req.params.aid;
    console.log(req.params);
    Appointment.deleteOne({ _id: aid }).then(function () {
        res.json({ msg: " Appointment canceled" })
    }).catch(function (error) {
        res.json({ msg: "Couldn't cancel appointment" });
    })
});

module.exports = router;