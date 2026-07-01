const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());


// serve index.html correctly
app.use(express.static(__dirname));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.log("MongoDB error:", error.message);
});


// Property database
const Property = mongoose.model("Property", {

    title: String,
    type: String,
    state: String,
    location: String,
    price: String,
    description: String,
    image: String

});


// Home page
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});


// Add property
app.post("/api/properties", async(req,res)=>{

    try {

        const property = await Property.create(req.body);

        res.json({
            success:true,
            property
        });

    } catch(error){

        res.status(500).json({
            error:error.message
        });

    }

});


// Get properties
app.get("/api/properties", async(req,res)=>{

    const properties = await Property.find();

    res.json(properties);

});



// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{

    console.log("HomeHub server running");

});