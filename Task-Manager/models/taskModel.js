const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false

    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Task = mongoose.model("Task",taskSchema)

module.exports = Task;