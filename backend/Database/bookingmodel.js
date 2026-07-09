const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
        courtId: { type: mongoose.Schema.Types.ObjectId, ref: "Court", required: true },
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