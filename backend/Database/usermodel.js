const userSchema = new mongoose.Schema(
    {
        id:{type:string, required:true},
        fullname:{type:string, required:true},
        email:{type:string, required:true},
        password:{type:string, required:true},
        role:{type:string, enum:["customer","owner","admin"], required:true},
        createdAt:{type:Date, default:Date.now},
        updatedAt:{type:Date, default:Date.now},
    }
 )
 module.exports = mongoose.model("User", userSchema);