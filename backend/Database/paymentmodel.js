const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        bookingId:{type:mongoose.Schema.Types.ObjectId, ref:"Booking", required:true},
        amount:{type:Number, required:true},
        paymentMethod:{type:String, enum:["credit_card","debit_card","paypal","bank_transfer","UPI"], required:true},
        paymentStatus:{type:String, enum:["pending","completed","failed"], default:"pending"},
        transactionId:{type:String},
        paidAt:{type:Date},
        createdAt:{type:Date, default:Date.now},
        updatedAt:{type:Date, default:Date.now},
    }
);

module.exports = mongoose.model("Payment", paymentSchema);