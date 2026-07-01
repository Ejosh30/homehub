const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));


// DATABASE
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
console.log("MongoDB connected");
})
.catch(err=>{
console.log(err);
});


// PROPERTY MODEL
const Property = mongoose.model("Property", {

title:String,
type:String,
state:String,
location:String,
price:String,
description:String,
image:String

});


// HOME PAGE
app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"index.html"));
});


// ADD PROPERTY
app.post("/api/properties", async(req,res)=>{

try{

const property = await Property.create(req.body);

res.json({
message:"Property listed successfully",
property
});

}catch(error){

res.status(500).json({
error:error.message
});

}

});


// GET PROPERTIES
app.get("/api/properties", async(req,res)=>{

const properties = await Property.find();

res.json(properties);

});


const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
console.log("HomeHub server running");
});