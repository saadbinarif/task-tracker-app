const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },
    // subtasks:[
    //     {title: String, isCompleted: Boolean}
    // ],
    subtasks: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'subtaskModel' }
    ],
    progress:{
        type: Number
    },
    dueDate: {
        type: Date
    },
    creator_id: {
        type: String,
        required: true

    }
}, {timestamps: true})

module.exports = mongoose.model('task', taskSchema);