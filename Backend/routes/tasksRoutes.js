const express = require('express');
const mongoose = require('mongoose');
const taskModel = require('../models/taskModel');

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
router.post('/', async(req, res)=>{
    const {title, description, status} = req.body;
    try{
        const task = await taskModel.create({title, description, status})
        res.status(200).json(task);
        console.log()
    }catch(error){
        res.status(400).json({error:error.message})
    }
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