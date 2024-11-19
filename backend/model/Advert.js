const mongoose = require('mongoose');

const AdvertSchema = mongoose.Schema({
    title: String,
    type: String,
    price: Number,
    description: String,
    city: String,
    delegation: String,
    category: String,
    imageAdvert: [
        { path: String }
    ],
    userAdvert: String,
    advertState: String,
    //"Approved" or "Under review" 
})
module.exports = mongoose.model('advertSchemas', AdvertSchema);