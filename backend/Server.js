const express = require("express");
const app = express();
require("dotenv").config();



const connectDB = require("./Database/connect");
const register = require("./Controllers/register");
const login = require("./Controllers/login");


app.use(express.json());


// MongoDB connection
connectDB();

app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

// Register API
app.post("/register", register);
app.post("/login", login);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 8000");
});