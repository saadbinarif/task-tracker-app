const express = require('express');
const userModel = require("../models/userModel")
const userModelp = require("../models/postgresModels/userModelp")
const jwt = require('jsonwebtoken')
const transporter = require('../mail-config');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const validator = require('validator')


const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
}

//---- /auth/login
const loginUser = async(req, res)=>{
  const {email, password} = req.body;

  try{
    const user = await userModel.findOne({email})
    if(!user) return res.status(404).json({error: 'Invalid email or password'})

    if(user.isEmailVerified == false){
      // res.redirect('/auth/verify-email')
      return res.status(404).json({error: "please verify your email first"})
    }else{
      const match = await bcrypt.compare(password, user.password)
      if (!match) return res.status(400).json({error: "Invalid password"})

      const token = createToken(user._id);
      res.status(200).json({message: 'Login successful', token})
    }

  }catch(error){
    res.status(500).json({error: error.message})
  }

}

//---- /auth/signup
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

//---- /auth/verify-email
const verifyEmail = async(req,res) =>{

    try{
      
      const {linkemail, linktoken, expiry} = req.query;
      const user = await userModel.findOne({email: linkemail, linkToken: linktoken})
      if(!user) return res.status(404).json({error: "not a valid link"})

      //if email is already verified redirect to login page else login user
      if(user.isEmailVerified){
        return res.status(209).json({error: "email already verified"})
      }else{
        const currentTimestamp = new Date().getTime()
        if(currentTimestamp > user.expiryTimestamp){
          return res.status(410).json({error: "Link has been expired"})
        }
        user.isEmailVerified = true;
        await user.save();
        const token = createToken(user._id);
        res.status(200).json({msg: "Verification successful", token})

      }

    }catch(error){
      res.status(500).json({error: error.message})
    }


}

//----/auth/resend-link
const resendLink = async(req, res)=>{
  const {email} = req.body
  try{
    if(!email) return res.status(400).json({error: "Email required"})
    if(!validator.isEmail(email)) res.status(400).json({error: "Invalid Email"})

    const user = await userModel.findOne({email})
    if(!user) res.status(404).json({error: "User not found"})

    const currentTimestamp = new Date().getTime();

    if(currentTimestamp < user.expiryTimestamp){
      return res.status(409).json({error: "Error 409 - conflict: Link already sent"})
    }
      if(user.isEmailVerified) return res.status(409).json({error: "email already verified"})
      const linkToken = uuidv4();
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 2); // Link expires in 2 minutes
    const expiryTimestamp = expiryDate.getTime();
    const verificationLink = `http://localhost:4000/auth/verify-email?linkemail=${email}&linktoken=${linkToken}&expiry=${expiryTimestamp}`;

    const sendMail = await transporter.sendMail({
        from: "<robertsmithrs97@outlook.com>",
        to: email,
        subject: 'Resend: Verification Link for Login',
        text: `This link will expire in 2 minutes. Please verify your email by clicking on this link: ${verificationLink}`
    });
    if (!sendMail) {
        return res.status(502).json({ error: "bad_gateway: wasn't able to send email at this time" })
    }
        user.linkToken = linkToken;
        user.expiryTimestamp = expiryTimestamp
        await user.save()
        res.status(200).json({message:"link sent"})
    

  }catch(error){
    res.status(500).json({error:error.message})
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
    signupUserPosgres,
    verifyEmail,
    resendLink
}

