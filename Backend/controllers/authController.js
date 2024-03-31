const express = require('express');
const userModel = require("../models/userModel")
const userModelp = require("../models/postgresModels/userModelp")
const jwt = require('jsonwebtoken')
const transporter = require('../mail-config');
const bcrypt = require('bcrypt');


const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
}

const loginUser = async(req,res)=>{
    try {
        
        const {linkemail, linktoken} = req.query; // Extract token from query parameters
    
        // Find user by email
        let user;
        if (linkemail && linktoken) {
          user = await userModel.findOne({ email: linkemail, linkToken: linktoken });
        }
    
        if (user && linktoken) {
          // If a token is provided and user is found by email, check if it matches the user's token
          if (user.linkToken !== linktoken) {
            return res.status(400).json({ message: 'Invalid token. Please register via the link sent to your email.' });
          }
          else{
            // Token matches, log in the user and mark the token as used
          user.linkTokenUsed = true;
          await user.save();
          }
          
          
    
          // Generate JWT token
          const token = createToken(user._id)
    
          return res.status(200).json({ message: 'Login successful', token });

        } else if (!linktoken) {
            const { email, password } = req.body;
            user = await userModel.findOne({ email });
          // If no token is provided, check if password is correct
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
          }
    
          // Generate JWT token
          const token = createToken(user._id)
    
          res.status(200).json({ message: 'Login successful', token });
        } else {
          return res.status(400).json({ message: 'Invalid email or password. Please register via the link sent to your email.' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
   
}

const signupUser = async(req,res)=>{
    const {u_name, email, password} = req.body;

    try{
        const user = await userModel.signup(u_name, email, password)
        const token = createToken(user._id)
        

        res.status(200).json({u_name, email, token})

    }catch(error){
        res.status(400).json({error: error.message})
    }
}


//-------------------- postgres controllers -------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

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

