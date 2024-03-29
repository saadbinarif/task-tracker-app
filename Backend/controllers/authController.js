const express = require('express');
const userModel = require("../models/userModel")
const userModelp = require("../models/postgresModels/userModelp")
const jwt = require('jsonwebtoken')


const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
}

const loginUser = async(req,res)=>{
    const {email, password} = req.body;

    try{
        const user = await userModel.login(email, password)

        const token = createToken(user._id)
        res.status(200).json({email, token})

    }catch(error){

        res.status(400).json({error: error.message})

    }
}

const signupUser = async(req,res)=>{
    const {email, password} = req.body;

    try{
        const user = await userModel.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})

    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//postgres controllers

const loginUserPosgres = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Perform user login using your Sequelize model method
        const user = await userModelp.login(email, password);

        // Create token
        const token = createToken(user.id); // Assuming your user model has an 'id' field

        // Respond with email and token
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const signupUserPosgres = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Perform user signup using your Sequelize model method
        const user = await userModelp.signup(email, password);

        // Create token
        const token = createToken(user.id); // Assuming your user model has an 'id' field

        // Respond with email and token
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = {
    loginUser,
    signupUser,
    loginUserPosgres,
    signupUserPosgres
}

