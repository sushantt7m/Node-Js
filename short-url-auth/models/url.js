const mongoose = require('mongoose');


const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true
    },
    redirectUrl: {
        type: String,
        unique:true,
        required: true
    },
    visitHistory: [{timestamp: {type: Number,default:Date.now()}}]
}, { timestamp: true })



const Url = mongoose.model('Url', urlSchema);

module.exports = Url;