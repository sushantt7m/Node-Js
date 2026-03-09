const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    }
}, { timestamps: true })


const User = mongoose.model('user',userSchema);



module.exports = User;