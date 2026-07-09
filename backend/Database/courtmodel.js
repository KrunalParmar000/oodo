const mongoose = require("mongoose");
const courtSchema = new mongoose.Schema(
    {
        venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
        name: { type: String, required: true },
        sport: { type: String, required: true },
        pricePerhour: { type: Number, required: true },
        indoor: { type: Boolean, default: true },
        status: { type: String, enum: ["available", "unavailable", "maintenance"], default: "available" },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    }
)

module.exports = mongoose.model("Court", courtSchema);
