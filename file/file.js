const multer= require("multer");

//uploading file code
const storgae1= multer.diskStorage({
    destination: function(req, file, cb){  //cb= callback
        cb(null, 'uploads/')
    },
    filename: function(req,file,cb){
        cb(null, Date.now()+ file.originalname)
    }
})

//now we need to check the file format
const filter= function(req,file,cb){
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' ){
        //correct
        cb(null,true)
    }
    else{
        //incorrect
        cb(null,false)
        
    }
}

const upload= multer({
    storage:storgae1, //1st ko multer ko storage 2nd ma hamle banayeko
    fileFilter: filter
})
module.exports= upload