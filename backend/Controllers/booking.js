const Booking = require("../Database/bookingmodel");


const createBooking = async (req, res) => {

    try {

        const {
            venueId,
            courtId,
            date,
            startTime,
            endTime,
            totalAmount
        } = req.body;


        const userId = req.user.id;

        if (
            !userId ||
            !venueId ||
            !courtId ||
            !date ||
            !startTime ||
            !endTime ||
            !totalAmount
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // Check existing booking
        const existingBooking = await Booking.findOne({
            courtId,
            date,
            startTime,
            bookingStatus: {
                $in: ["pending", "confirmed"]
            }
        });


        if (existingBooking) {
            return res.status(400).json({
                message: "Court already booked for this time"
            });
        }


        const booking = await Booking.create({
            userId,
            venueId,
            courtId,
            date,
            startTime,
            endTime,
            totalAmount
        });


        res.status(201).json({
            message: "Booking created successfully",
            booking
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};


const getBookings = async (req, res) => {

    try {

        // Only admin and owner can view all bookings
        if (
            req.user.role !== "admin" &&
            req.user.role !== "owner"
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }


        const bookings = await Booking.find()
            .populate("userId", "fullname email role")
            .populate("venueId", "name location")
            .populate("courtId", "name");


        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};


/* Get all bookings */
const getUserBookings = async (req, res) => {

    try {

        const userId = req.user.id;


        const bookings = await Booking.find({
            userId
        })
            .populate("venueId")
            .populate("courtId");


        res.status(200).json(bookings);


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};



const updateBookingStatus = async (req, res) => {

    try {

        if (
            req.user.role !== "owner" &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }


        const { id } = req.params;

        const booking = await Booking.findByIdAndUpdate(
            id,
            {
                bookingStatus: req.body.bookingStatus,
                paymentStatus: req.body.paymentStatus,
                updatedAt: Date.now()
            },
            {
                new: true
            }
        );


        res.json({
            message: "Booking updated",
            booking
        });


    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

};




module.exports = {
    createBooking,
    getBookings,
    getUserBookings,
    updateBookingStatus
};