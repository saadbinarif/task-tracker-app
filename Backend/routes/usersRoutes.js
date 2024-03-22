const express = require('express');

const router = express.Router();

//get all users
router.get('/', (req, res)=>{
    res.send("get all users")
})

//get a specific user by id
router.get('/:id', (req, res)=>{
    res.send("get a specific user by id")
})

//create a new user
router.post('/', (req, res)=>{
    res.send("create a new user")
})

//update a user
router.put('/:id', (req, res)=>{
    res.send("update a user")
})

//delete a user
router.delete('/:id', (req, res)=>{
    res.send("delete a user")
})

module.exports = router