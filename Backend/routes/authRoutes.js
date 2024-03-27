const express = require('express');
const userModel = require("../models/userModel")
const {loginUser, signupUser} = require('../controllers/authController')
/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      required:
 *          - id
 *          - email
 *          - password
 *      properties:
 *          _id: 
 *              type: string
 *              description: Auto generated ID of the user
 *          email:
 *              type: string
 *              description: unique email of the user
 *          password:
 *              type: string
 *              description: Password should contain atleast 8 chracters. must include lowercase, upercase, number, and a special charcter
 *      example:
 *          _id: aslkdjskdjlad3add
 *          email: example@mail.com
 *          password: Abcabc123!
 * 
 * 
 * 
 */




 



const router = express.Router();

// Login
router.post('/login', loginUser)

// Sign up
router.post('/Signup', signupUser)


module.exports = router;