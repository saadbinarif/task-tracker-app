const tagModel = require('../models/tagModel')
const mongoose = require("mongoose");

const getTags = async(req, res)=>{
    const creator_id = req.user._id
    const tags = await tagModel.find({creator_id}).sort({createdAt:-1})
    res.status(200).json(tags)
}


const createTag = async(req, res)=>{
    
    const creator_id = req.user._id
    const {tag_name} = req.body

    if(!tag_name) return res.status(400).json({error: "no such tag"})

    const tag = await tagModel.create({ tag_name, creator_id })
    res.status(200).json(tag);

    
}

const deleteTag = async(req,res)=>{
 
    const { id } = req.params;
    const validId = mongoose.Types.ObjectId.isValid(id);
    if(!validId) return res.status(400).json({error: "Invalid Id"})

    const tag = await tagModel.findOneAndDelete({_id:id})
    if(!tag) res.status(404).json({error: "No user found"})
    
    res.status(200).json(tag);


   

}

module.exports = {
    getTags,
    deleteTag,
    createTag
}