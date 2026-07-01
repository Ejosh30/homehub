const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname)));

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
console.log("MongoDB connected");
})
.catch(err=>{
console.log(err);
});


const Property = mongoose.model("Property", {

title:String,
type:String,
state:String,
location:String,
price:String,
description:String,
image:String

});


app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"index.html"));
});


app.post("/api/properties", async(req,res)=>{

const property = await Property.create(req.body);

res.json(property);

});


app.get("/api/properties", async(req,res)=>{

const properties = await Property.find();

res.json(properties);

});


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
console.log("HomeHub server running");
});