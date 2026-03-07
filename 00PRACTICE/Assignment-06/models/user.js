const mongoose = require('mongoose')

// SCHEMA
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    job_title: {
        type: String,
    },
    gender: {
        type: String,
    },
},{timestamps:true})

// CREATING USER FOR ABOVE SCHEMA
const User = mongoose.model('User', userSchema);

module.exports = User