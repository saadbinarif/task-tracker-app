const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const subtaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    isComplete: {
        type:Boolean,
        default: false
    },
    parentTask: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'taskModel' 
    }
}, {timestamps: true})

module.exports = mongoose.model('subtask', subtaskSchema);