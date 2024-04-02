const tagModel = require('../models/tagModel')
const mongoose = require("mongoose");

const getTags = async(req, res)=>{
    const tags = await tagModel.find({}).sort({createdAt:-1})
    res.status(200).json(tags)
}

const createTag = async(req, res)=>{
    try{
        const {tag_name} = req.body

    if(!tag_name) return res.status(400).json({error: "no tag"})

    const tag = await tagModel.create({ tag_name })
    res.status(200).json(tag);

    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

const deleteTag = async(req,res)=>{
   try{
    const { id } = req.params;
    const validId = mongoose.Types.ObjectId.isValid(id);
    if(!validId) return res.status(400).json({error: "Invalid Id"})

    const tag = await tagModel.findOneAndDelete({_id:id})
    if(!tag) res.status(404).json({error: "No user found"})
    
    res.status(200).json(tag);

   }catch(error){
    res.status(500).json({error: error.message})
   }

}

module.exports = {
    getTags,
    deleteTag,
    createTag
}