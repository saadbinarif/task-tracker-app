const express = require('express');
const userModel = require("../models/userModel")
const {loginUser, signupUser} = require('../controllers/authController')

const router = express.Router();

// Login
router.post('/login', loginUser)

// Sign up
router.post('/Signup', signupUser)


module.exports = router;