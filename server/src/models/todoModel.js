const mongoose = require('mongoose');

const Schema = mongoose.Schema

const TodoSchema = new Schema({
    uid: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        require: true
    }
}, { timestamps: true })

const todoSchema = mongoose.model('Todo', TodoSchema)
module.exports = todoSchema