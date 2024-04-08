const express = require('express');
const usePosgres = require('../db/connect')
const tryCatch = require('../middlewares/tryCatch');
const {getUsers, deleteUser, updateUser, getUsersPosgres, deleteUserPosgres, updateUserPosgres} = require("../controllers/userController");


const router = express.Router();

//get all users
router.get('/', usePosgres? getUsersPosgres : tryCatch(getUsers))

//get a specific user by id
// router.get('/:id', (req, res)=>{
//     res.send("get a specific user by id")
// })


//update a user
router.put('/:id', usePosgres? updateUserPosgres : tryCatch(updateUser))

//delete a user
router.delete('/:id', usePosgres? deleteUserPosgres : tryCatch(deleteUser))

module.exports = router


/**
 * @swagger
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
 *       example:
 *         _id: aslkdjskdjlad3add
 *         email: example@mail.com
 *         
 */

/**
 * tags:
 *  name: Users
 *  description: The Users APIs
 */

//routes
/**
 * @swagger
 * /users:
 *   get:
 *     summary: returns the list of all the users(_id and email only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of all the users with id and email only
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */

/**
 * @swagger
 * paths:
 *   /users/{id}:
 *     delete:
 *       summary: Delete a user by ID
 *       tags:
 *         - Users
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the user to delete
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Tag deleted successfully
 *         '400':
 *           description: Unauthorized
 */