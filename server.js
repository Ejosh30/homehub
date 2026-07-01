const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// database
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
console.log("Database connected");
})
.catch(err=>{
console.log(err);
});


// test route
app.get("/api", (req,res)=>{
res.json({
message:"HomeHub backend working"
});
});


// properties
let properties=[];


app.post("/api/properties",(req,res)=>{

const property=req.body;

properties.push(property);

res.json({
message:"Property added",
property
});

});



app.get("/api/properties",(req,res)=>{

res.json(properties);

});



const PORT=process.env.PORT || 3000;


app.listen(PORT,()=>{
console.log("HomeHub server running");
});