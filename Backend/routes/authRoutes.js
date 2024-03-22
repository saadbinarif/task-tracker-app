const express = require('express');

const router = express.Router();

// create a new user
router.post('/register/:id', (req, res)=>{
    res.send("create a new user")
})

// login
router.post('/login/:id', (req, res)=>{
    res.send("logged in")
})

// logout
router.post('/logout/:id', (req, res)=>{
    res.send("logged out")
})

module.exports = router;