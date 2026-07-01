const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Show your website
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
})
.catch((err) => {
  console.log("MongoDB error:", err.message);
});


// Test route
app.get("/api", (req, res) => {
  res.json({
    message: "HomeHub backend is working"
  });
});


// Temporary property storage
let properties = [];


// Add property
app.post("/api/properties", (req, res) => {

  const property = {
    id: Date.now(),
    ...req.body
  };

  properties.push(property);

  res.json({
    message: "Property added",
    property
  });

});


// Get properties
app.get("/api/properties", (req,res)=>{

  res.json(properties);

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("HomeHub server running");
});