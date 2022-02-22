const mongoose= require("mongoose");

// mongoose.connect('mongodb://127.0.0.1:27017/touchofbeauty', { 
//     useNewUrlParser: true, 
//     useUnifiedTopology : true 

// }) 

mongoose.connect('mongodb+srv://riya:riya@cluster0.qbe41.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology : true 

}) 