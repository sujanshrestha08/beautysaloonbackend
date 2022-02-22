// const express= require("express");
// const Cart = require("../models/cartModel")

// const router= new express.Router();
// const auth = require("../auth/auth");

// router.post("/cart/insert/:sid", auth.verifyClient, function(req,res){
    
//     const clientid= req.clientInfo._id;
//     const sid= req.params.sid;
  

//     const cartData= new Cart({
//         clientid: clientid,
//         sid: sid,
       
       
       
//     })
//     cartData.save()
//     .then(function(){
//         res.status(200).json({msg:"Added to Cart Successful"})
//     })
//     .catch(function(error){
//         res.status(500).json(error);
//     })


// })

// // updating cart
// router.put("/cart/update", auth.verifyClient, function(req,res){
   
//     var totalprice= req.body.totalprice;
//     const clientid= req.body.clientid;
//     const sid= req.body.sid;
//     const cartid= req.body.cartid
 

//     Cart.updateOne({ _id: cartid},
//         {
//             totalprice: totalprice,
//             clientid: clientid,
//             sid: sid,
//             cartid: cartid,
            

//         })
//         .then(function(){
//             res.json("cart updated successfully")
//         })
//         .catch(function (e){
//             res.json("Sorry!!!\nCouldn't add cart.")
//         })
// })


// //view all of cart details
// router.get("/cart/view", auth.verifyClient, function (req, res) {
//     Cart.findOne({ clientid: req.clientInfo._id}).populate('sid')   //.populate('pid')
//         .then(function (data) {
//             var temp=data.toJSON();
//             var price=0;

           
//             // data['pid'].forEach(element => {
//             //     price+= element['pprice']

                
//             // });
//             data['sid'].forEach(element => {
//                 price+= element['sprice']

                
//             });
//             // console.log(price)
//             // console.log(data[0]['sid']);

//             temp.amt=price;
//             //  console.log(temp.amt);
//             // console.log(data[0]['pid']);
//             return res.json(temp);


            
//         })
//         .catch(function () {
//             res.json({ msg: "Something went wrong" })
//         })
// })

// router.delete("/cart/delete/:cid", function (req, res) {
//     const cid = req.params.cid;
//     console.log(req.params);
//     Cart.deleteOne({ _id: cid }).then(function () {
//         res.json({ msg: "Item deleted" })
//     }).catch(function (error) {
//         res.json({ msg: "something went wrong" });
//     })
// });

// module.exports = router;