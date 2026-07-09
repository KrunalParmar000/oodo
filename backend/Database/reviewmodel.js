const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
        venueId:{type:mongoose.Schema.Types.ObjectId, ref:"Venue", required:true},
        courtId:{type:mongoose.Schema.Types.ObjectId, ref:"Court", required:true},
        rating:{type:Number, min:1, max:5, required:true},
        review:{type:String},
        createdAt:{type:Date, default:Date.now},
        updatedAt:{type:Date, default:Date.now},
    }
);

module.exports = mongoose.model("Review", bookingSchema);