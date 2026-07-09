const mongoose = require('mongoose');
<<<<<<< HEAD
const Schema = mongoose.Schema;
=======
>>>>>>> beab4eb62f6a56c1c7f9c16a39d3ef3eba8e9851
const bookingSchema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        venueId: { type: Schema.Types.ObjectId, ref: "Venue", required: true },
        courtId: { type: Schema.Types.ObjectId, ref: "Court", required: true },
        date: { type: Date, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        totalAmount: { type: Number, required: true },
        bookingStatus: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" },
        paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    }
);

module.exports = mongoose.model("Booking", bookingSchema);