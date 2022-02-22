const express = require("express");
const Category = require("../models/categoryModel")

const router = new express.Router();
const auth = require("../auth/auth");
const upload = require("../file/file");

router.post("/category/insert", auth.verifyAdmin, upload.single('category_image'), function (req, res) {
    if (req.file == undefined) {
        return res.json({
            msg: "Invalid file format"
        })
    }
    const cname = req.body.cname;
    const cimage = req.file.filename;

    const categoryData = new Category({
        cname: cname,
        cimage: cimage
    })
    categoryData.save().then(function () {
        res.json({ msg: "Category Added Successfully" , success:true })
    }).catch(function (error) {
        res.json(error);
    })

});


//view all of my categories
router.get("/category/view", function (req, res) {
    Category.find()
        .then(function (data) {
            res.json(data);
        })
        .catch(function () {
            res.json({ msg: "Something went wrong" })
        })
})

//view single category
router.get("/category/single/:cid", function (req, res) {
    Category.find({ _id: req.params.cid })
        .then(function (data) {
            res.json(data)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" })
        })
})

//update name of category
router.put("/category/update", auth.verifyAdmin, function (req, res) {
    const cid = req.body.cid;
    const cname = req.body.cname;
    
    console.log(req.body);
    
    Category.updateOne({ _id: cid },
        {   
            cid:cid,
            cname: cname,
        })
        .then(function () {
            res.json("category updated successfully")
        })
        .catch(function (e) {
            res.json("Some error occured")
        })
})

router.put('/category/image', upload.single('cimage'), auth.verifyAdmin, function(req,res){
    const cid= req.body.cid;
    const cimage= req.file.filename;


    Category.updateOne({_id:cid},
        {   
            cid:cid,
            cimage:cimage
        }).then(function(){
            res.json(" category image updated successfully")
        }).catch(function (e){
            res.json("Some error occured")
        })
        

})

// //for posting/ uploading image of category
// router.post("/category/image", upload.single('category_image'), function (req, res) {  //user_image postman sanga milcha
//     console.log(req.file);
//     if (req.file === undefined) {
//         return res.json({
//             msg: "Invalid file format"
//         })
//     }
//     const category = new Category({
//         image: req.file.filename
//     })
//     category.save()
// })

router.delete("/category/delete/:cid", auth.verifyAdmin, function (req, res) {
    const cid = req.params.cid;
    console.log(req.params);
    Category.deleteOne({ _id: cid }).then(function () {
        res.json({ msg: "Category deleted" })
    }).catch(function (error) {
        res.json({ msg: "something went wrong" });
    })
});


// router.put("/category/update/:cid", auth.verifyAdmin, function (req, res) {
//     Category.findOneAndUpdate({ _id: req.params.cid },
//         {
//             $set:{
//                  cname: req.body.cname,
//                  cimage: req.body.cimage,
//             }    
//         })
//         .then(function () {
//             res.json("update successful")
//         })
//         .catch(function (e) {
//             res.json("Some error occured")
//         })
// })
module.exports = router;