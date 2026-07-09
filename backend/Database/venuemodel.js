const venueSchema = new Schema(
    {
        ownerId:{type:Schema.Types.ObjectId, ref:"User", required:true},
        name:{type:String, required:true},
        address:{street: String, city: String, state: String, zip: String},
        sports:{type:[String], required:true},
        images:{type:[String]},
        createdAt:{type:Date, default:Date.now},
        updatedAt:{type:Date, default:Date.now},
    }
)

module.exports = mongoose.model("Venue", venueSchema);