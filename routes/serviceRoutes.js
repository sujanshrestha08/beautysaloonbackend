const express = require("express");
const Service = require("../models/serviceModel")

const router = new express.Router();
const auth = require("../auth/auth");
const upload = require("../file/file");
const { createIndexes } = require("../models/serviceModel");

router.post("/service/insert", auth.verifyAdmin,  upload.single('service_image'), function (req, res) {
    if (req.file == undefined) {
        return res.json({
            msg: "Invalid file in format"
        })
    }
    console.log(req.file)
    const sname = req.body.sname;
    const sduration = req.body.sduration;
    const sprice = req.body.sprice;
    const simage= req.file.filename;
    const sdescription = req.body.sdescription;
    const cid = req.body.cid;

    const serviceData = new Service({
        sname: sname,
        sduration: sduration,
        sprice: sprice,
        simage: simage , //simage thiyo paila
        sdescription: sdescription,
        cid: cid,
    })

    serviceData.save().then(function () {
        res.json({ msg: "Service Added Successfully" , success:true})
    }).catch(function (error) {
        res.json(error);
    })

})


//updating service
router.put("/service/update", auth.verifyAdmin, function (req, res) {

    const sname= req.body.sname;
    const sduration= req.body.sduration;
    const sprice= req.body.sprice;
    const sdescription= req.body.sdescription;
    const cid= req.body.cid;
    const sid= req.body.sid;

    console.log(req.body);

    Service.updateOne({ _id: sid},
        {
            sname: sname,
            sduration: sduration,
            sprice: sprice,
            sdescription: sdescription,
            cid: cid,
            sid:sid
        })
        .then(function () {
            res.json(" all update successful")
        })
        .catch(function (e) {
            res.json("Some error occured")
        })
})

router.put('/service/image', upload.single('service_image'), auth.verifyAdmin, function(req,res){
    const sid= req.body.sid;

    console.log(sid);
    Service.updateOne({_id:sid},
        {   
            sid:sid,
            simage:req.file.filename,

        }).then(function(){
            res.json("image updated successfully")
        }).catch(function (e){
            res.json("Some error occured")
        })
        

})

router.delete("/service/delete/:sid", auth.verifyAdmin, function (req, res) {
    const sid = req.params.sid;
    console.log(req.params);
    Service.deleteOne({ _id: sid }).then(function () {
        res.json({ msg: "Service deleted" })
    }).catch(function (error) {
        res.json({ msg: "something went wrong" });
    })
});

//view all of my services by admin
router.get("/service/view", function (req, res) {
    Service.find({ })
        .then(function (data) {
            res.json(data);
        })
        .catch(function () {
            res.json({ msg: "Something went wrong" })
        })
})

router.get("/service/single/:sid", auth.verifyAdmin, function(req,res){
    Service.findOne({_id:req.params.sid})
    .then(function(data){
        res.json(data);
    })
    .catch(function (){
        res.json({msg: "Something went wrong"})
    })
})



//view services by user
router.get("/service/category/:cid", function (req, res) {

     const cid= req.params.cid
     Service.find({cid:cid })

        .then(function (data) {
            res.json(data);
        })
        .catch(function () {
            res.json({ msg: "Something went wrong" })
        })
})

router.get("/service/view/nails",  function (req, res) {
    Service.find({ cid: "61d1db2fb2171d1e074907d1" })
        .then(function (data) {
            res.json(data);
        })
        .catch(function () {
            res.json({ msg: "Something went wrong" })
        })
})


module.exports = router;