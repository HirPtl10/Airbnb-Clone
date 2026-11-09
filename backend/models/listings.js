const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let listingSchema = new Schema({
    title: String,
    description: String,
    image: {
        filename: String,
        url: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;