const express = require("express");
const app = express();
require("dotenv").config();




const connectDB = require("./Database/connect");
const register = require("./Controllers/register");
const login = require("./Controllers/login");
const booking = require("./Controllers/booking");
const auth = require("./Middleware/auth");
const verifyToken = require("./Controllers/verify");
const venue= require("./Controllers/venue");


app.use(express.json());


// MongoDB connection
connectDB();

app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

// Register API
app.post("/register", register);
app.post("/login", login);
// Customer creates booking
app.post(
    "/booking",
    auth,
    booking.createBooking
);


// Customer views own bookings
app.get(
    "/booking/user",
    auth,
    booking.getUserBookings
);


// Owner/Admin updates booking
app.put(
    "/booking/:id",
    auth,
    booking.updateBookingStatus
);


// Admin can view all
app.get(
    "/booking",
    auth,
    booking.getBookings
);


app.get(
    "/verify",
    auth,
    verifyToken
);


// Venue APIs
app.post("/venue", auth, venue.createVenue);
app.get("/venue", auth, venue.getAllVenues);
app.get("/venue/:id", auth, venue.getVenueById);
app.put("/venue/:id", auth, venue.updateVenue);
app.delete("/venue/:id", auth, venue.deleteVenue);


app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 8000");
});