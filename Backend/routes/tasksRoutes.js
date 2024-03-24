const express = require('express');
const mongoose = require('mongoose');
const {
    createTask,
    getAllTasks,
    getTask,
    deleteTask,
    updateTask

} = require('../controllers/taskController');


const router = express.Router();

//get all tasks
router.get('/', getAllTasks)

//get a specific task by id
router.get('/:id', getTask)

//post a task
router.post('/', createTask)

//update a task
router.put('/:id', updateTask)

//delete a task
router.delete('/:id', deleteTask)

module.exports = router