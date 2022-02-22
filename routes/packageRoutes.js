const express = require("express");
const Package = require("../models/packageModel")

const router = new express.Router();
const auth = require("../auth/auth");
const upload = require("../file/file");


//inserting data into package model 
router.post("/package/insert", auth.verifyAdmin, upload.single('pimage'), function(req,res){
    if(req.file==undefined){
        return res.json({
            msg:"Invalid file format"
        })
    }

    console.log(req.body);
    const pname= req.body.pname;
    const pimage= req.file.filename;
    const pdescription= req.body.pdescription;
    const pprice= req.body.pprice;
    const pduration= req.body.pduration;

    const packageData = new Package({
        pname:pname,
        pimage:pimage,
        pdescription:pdescription,
        pprice:pprice,
        pduration: pduration

    })

    packageData.save().
    then(function(){
    res.status(200).json({msg:"Package added succesfully"})
    }).catch(err=>{console.log(err);
    res.status(500).json({
        error: err
    })
    })
})


//updating package
router.put("/package/update", auth.verifyAdmin, function (req, res) {

    const pid= req.body.pid;
    const pname= req.body.pname;
    const pdescription= req.body.pdescription;
    const pprice= req.body.pprice;
    const pduration= req.body.pduration;

    console.log(req.body);

    Package.updateOne({ _id: pid},
        {   
            pid:pid,
            pname: pname,
            pdescription: pdescription,
            pprice: pprice,
            pduration: pduration,   
        })
        .then(function(){
            res.status(200).json({msg:" all update successful"})
        })
        .catch(function (e) {
            res.status(500).json("Some error occured")
        })
})

//updating image
router.put('/package/image', upload.single('pimage'), auth.verifyAdmin, function(req,res){
    const pid= req.body.pid;

    console.log(pid);
    Package.updateOne({_id:pid},
        {   
            pid:pid,
            pimage:req.file.filename,

        }).then(function(){
            res.status(200).json("image updated successfully")
        }).catch(function (e){
            res.status(500).json("Some error occured")
        })
        
})

//to get or view all the available packages
router.get("/package/view", auth.verifyAdmin, function(req,res){
    Package.find({aid: req.adminInfo._id})
    .then(function (data){
        res.status(200).json({data});
    })
    .catch(function(){
        console.log(err);
        res.status(500).json({msg:"Could not view package. Some error occured"})
    })
})

//view single package
router.get("/package/single/:pid", auth.verifyAdmin, function (req, res) {
    Package.find({ _id: req.params.pid })
        .then(function (data) {
            res.json(data)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" })
        })
})


//deleting package by passing params
router.delete("/package/delete/:pid", auth.verifyAdmin, function (req, res) {
    const pid = req.params.pid;
    console.log(req.params);
    Package.deleteOne({ _id: pid })
    .then(function () {
        res.status(200).json({ msg: "Package deleted" })
    }).catch(function () {
        res.status(500).json({ msg: "something went wrong" });
    })
});

module.exports=router;