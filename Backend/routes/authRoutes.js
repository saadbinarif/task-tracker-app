const express = require('express');
const userModel = require("../models/userModel")
const {loginUser, signupUser} = require('../controllers/authController')





 



const router = express.Router();

// Login
router.post('/login', loginUser)

// Sign up
router.post('/Signup', signupUser)


module.exports = router;

/**
@swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - id
 *         - email 
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto generated ID of the user
 *         email:
 *           type: string
 *           description: unique email of the user
 *          
 *         
 *       example:
 *         _id: aslkdjskdjlad3add
 *         email: example@mail.com
 *         
 */



/**
 * @swagger
 *  paths:
 *  /auth/signup:
 *    post:
 *      summary: "User Signup"
 *      description: "Register a new user"
 *      consumes:
 *        - "application/json"
 *      produces:
 *        - "application/json"
 *      parameters:
 *        - name: "body"
 *          in: "body"
 *          description: "User email and password"
 *          required: true
 *          schema:
 *            type: "object"
 *          
 *            properties:
 *              email:
 *                type: "string"
 *                format: "email"
 *                description: "User's email address"
 *              password:
 *                type: "string"
 *                description: "User's password"
 *            items:
 *              $ref: '#/components/schemas/Users'
 *      responses:
 *        200:
 *          description: "User registered successfully"
 *          schema:
 *            type: "object"
 *            properties:
 *              email:
 *                type: "string"
 *                format: "email"
 *                description: "User's email address"
 *              token:
 *                type: "string"
 *                description: "JWT token for authentication"
 *        400:
 *          description: "Invalid input, validation error"
 *        409:
 *          description: "Email already exists"
 *        500:
 *          description: "Internal server error"
 */