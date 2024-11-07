const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    role: {
        type: String,
        default: "user"
    },
    age: Number,
    phone: Number,
    imageUser: [],
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('userSchemas', UserSchema);