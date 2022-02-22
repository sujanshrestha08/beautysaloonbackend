const mongoose= require("mongoose");

const express= require("express");
const app= express();
const path=require("path")
const cors= require('cors');
app.use(cors());

require("./database/db");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/uploads'));


const clientRoute= require("./routes/clientRoute");
app.use(clientRoute);
const adminRoute= require("./routes/adminRoutes");
app.use(adminRoute);
const serviceRoute= require("./routes/serviceRoutes");
app.use(serviceRoute);
const categoryRoute=require("./routes/categoryRoutes");
app.use(categoryRoute);
const packageRoute=require("./routes/packageRoutes");
app.use(packageRoute);
// const cartRoute=require("./routes/cartRoutes");
// app.use(cartRoute);
const appointmentRoute=require("./routes/appointmentRoutes");
app.use(appointmentRoute);

app.listen("90");