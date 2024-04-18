const mongoose = require('mongoose')

const Schema =mongoose.Schema

const tagSchema = new Schema({
    tag_name:{
       type: String,
       required: true
    },
    creator_id: {
        type: String,
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('tag', tagSchema)