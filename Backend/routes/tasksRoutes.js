const express = require('express');

const router = express.Router();

//get all tasks
router.get('/', (req, res)=>{
    res.send("get all tasks ")
})

//get a specific task by id
router.get('/:id', (req, res)=>{
    res.send("get a specific task by id")
})

//post a task
router.post('/', (req, res)=>{
    res.send("post a task")
})

//update a task
router.put('/:id', (req, res)=>{
    res.send("update a task")
})

//delete a task
router.delete('/:id', (req, res)=>{
    res.send("delete a task")
})

module.exports = router