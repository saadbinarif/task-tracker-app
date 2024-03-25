const express = require('express');
const {getUsers, deleteUser} = require("../controllers/userController")

const router = express.Router();

//get all users
router.get('/', getUsers)

//get a specific user by id
router.get('/:id', (req, res)=>{
    res.send("get a specific user by id")
})

//update a user
router.put('/:id', (req, res)=>{
    res.send("update a user")
})

//delete a user
router.delete('/:id', deleteUser)

module.exports = router