const express = require('express');
const userModel = require("../models/userModel");
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')

//to get all users for admin
const getUsers = async(req,res)=>{
    // try{
        const users = await userModel.find({}).select("id email").sort({createdAt:-1})
        res.status(200).json(users)

    // }catch(error){
    //     res.status(500).json({error: error.message})
    // }
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

//to update user
const updateUser = async(req, res)=>{
    const {id} = req.params;
    const {email, currentPassword, newPassword} = req.body;
    
    try{
    //check if the given value in request params is valid   
    const validId = mongoose.Types.ObjectId.isValid(id)
    if(!validId) throw Error("Invalid user ID")

    //Check if the user with the provided id is in the database
    const user = await userModel.findById(id);
    if (!user) throw new Error("User not found")

    //validate the email and password format in the params
    if(!email) throw Error("Email is required")
    if(!validator.isEmail(email)) throw Error("Invalid email format")
    if(newPassword && !validator.isStrongPassword(newPassword)) throw Error("Password should be strong")
    if(!currentPassword) throw Error("Current password is required to make changes")

    //check if new email already exist for someother user
    const emailExists = await userModel.findOne({email, _id:{$ne: id}})
    if (emailExists) throw Error("Email already exists");

    user.email = email;

    //match the current password and hash the new
    const matchPassword = await bcrypt.compare(currentPassword, user.password)
    if(!matchPassword) throw Error("Password is incorrect")
    
    if(newPassword){
        const salt = await bcrypt.genSalt(10)
    const hashedNewPassword = await bcrypt.hash(newPassword, salt)
    user.password = hashedNewPassword
    }
    
    await user.save();

    res.status(200).json({ message: "User details updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }




}


module.exports = {
    getUsers,
    deleteUser,
    updateUser
}