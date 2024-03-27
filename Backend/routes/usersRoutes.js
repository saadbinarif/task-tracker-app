const express = require('express');
const {getUsers, deleteUser, updateUser} = require("../controllers/userController")

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








const router = express.Router();

//get all users
router.get('/', getUsers)

//get a specific user by id
// router.get('/:id', (req, res)=>{
//     res.send("get a specific user by id")
// })



//update a user
router.put('/:id', updateUser)

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



//delete a user
router.delete('/:id', deleteUser)

module.exports = router