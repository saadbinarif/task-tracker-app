const express = require('express');
const userModel = require("../models/userModel")
const {loginUser, signupUser, signupUserPosgres, loginUserPosgres, verifyEmail, resendEmail, verifyOTP, forgotPassword, resetPassword} = require('../controllers/authController')
const usePosgres = require('../db/connect');
const tryCatch = require('../middlewares/tryCatch');





 



const router = express.Router();

// Login
router.post('/login', usePosgres? loginUserPosgres : tryCatch(loginUser))

// Sign up
router.post('/signup', usePosgres? signupUserPosgres : tryCatch(signupUser))

//email Verification link
router.post('/verify-email/:linkToken', tryCatch(verifyEmail))

//resend veriication link
router.post('/resend-email', tryCatch(resendEmail))

//verify OTP
router.post('/verify-otp', tryCatch(verifyOTP))

//Forgot password
router.post('/forgot-password', tryCatch(forgotPassword))

//Password reset
router.post('/reset-password/:token', tryCatch(resetPassword))


module.exports = router;

/**
 * securityDefinitions:
 * bearerAuth:
 *   type: apiKey
 *   in: header
 *   name: Authorization
 *   description: Bearer token to access these API endpoints
 *   scheme: bearer
 *   bearerFormat: JWT

security:
 * - bearerAuth: []
 */





/**
 * @swagger
 *  paths:
 *   /auth/signup:
 *    post:
 *      summary: Sign up a new user
 *      tags: [Auth Routes]
 *      description: Register a new user with email and password
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *                  format: password
 *      responses:
 *        '201':
 *          description: User signed up successfully
 *        '400':
 *          description: Bad request, invalid input
 */

/**
 * @swagger
 *   paths:
 *    /auth/login:
 *      post:
 *        summary: Sign in a user
 *        tags:
 *          - Auth Routes
 *        description: Sign in an existing user with email and password
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    format: email
 *                  password:
 *                    type: string
 *                    format: password
 *        responses:
 *          '200':
 *            description: User signed in successfully
 *          '401':
 *            description: Unauthorized, invalid credentials
 *          '404':
 *            description: User not found
 */
