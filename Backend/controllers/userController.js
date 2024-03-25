const express = require('express');
const userModel = require("../models/userModel");
const { default: mongoose } = require('mongoose');

//to get all users for admin
const getUsers = async(req,res)=>{
    try{
        const users = await userModel.find({}).select("id email").sort({createdAt:-1})
        res.status(200).json(users)

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

//to delete user for admin
const deleteUser = async(req, res)=>{
    
        const {id} = req.params;
        const validId = mongoose.Types.ObjectId.isValid(id);
        if(!validId){
            res.status(400).json({error: "no such user"})
        }

        const user = await userModel.findOneAndDelete({_id:id})
        if(!user){
            return res.status(404).json({error: "no such user"})
        }
        res.status(200).json(user)
}


module.exports = {
    getUsers,
    deleteUser
}