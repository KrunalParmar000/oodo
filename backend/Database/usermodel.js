const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        id:{type:String, required:true},
        fullname:{type:String, required:true},
        email:{type:String, required:true},
        password:{type:String, required:true},
        role:{type:String, enum:["customer","owner","admin"], required:true},
        createdAt:{type:Date, default:Date.now},
        updatedAt:{type:Date, default:Date.now},
    }
 )
 module.exports = mongoose.model("User", userSchema);