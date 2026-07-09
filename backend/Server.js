const express = require("express");
const app = express();

const connectDB = require("./Database/connect");
const register = require("./Controllers/register");


app.use(express.json());


// MongoDB connection
connectDB();

app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

// Register API
app.post("/register", register);



app.listen(5000, () => {
    console.log("Server running on port 5000");
});