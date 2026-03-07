const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true,
        default:Date.now()
    }
})

const Notes = mongoose.model("notes", noteSchema);

module.exports = Notes;