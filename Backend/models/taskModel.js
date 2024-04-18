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
    subtasks:[
        {title: String, isComplete: Boolean}
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

    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tag'
    }]
}, {timestamps: true})

module.exports = mongoose.model('task', taskSchema);