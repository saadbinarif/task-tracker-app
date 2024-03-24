const mongoose = require('mongoose');
const taskModel = require('../models/taskModel');

// to get all tasks
const getAllTasks = async(req, res)=>{
    const task = await taskModel.find({}).sort({createdAt: -1});
    res.status(200).json(task);
}

//to get a single task
const getTask = async(req,res)=>{
    const {id} = req.params;

    //to check valid mongoID
    const validId = mongoose.Types.ObjectId.isValid(id);

    if(!validId){
        return res.status(400).json({error: "no such task"})
    }
    const task = await taskModel.findById(id)

    if(!task){
        return res.status(404).json({error: "no such task"})
    }
    res.status(200).json(task)
}

//to create a task
const createTask = async (req, res) => {
    const { title, description, status, dueDate } = req.body;

    let emptyFields = [];

    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(!status){
        emptyFields.push('status')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: 'Please fill all the fields', emptyFields})
    }

    try {
        const parsedDueDate = new Date(dueDate);
        const task = await taskModel.create({ title, description, status, dueDate:parsedDueDate });
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//to delete task
const deleteTask = async(req, res)=>{
    const {id} = req.params;
    const validId = mongoose.Types.ObjectId.isValid(id);

    if(!validId){
        return res.status(400).json({error: "no such task"})
    }

    const task = await taskModel.findOneAndDelete({_id:id});

    if(!task){
        return res.status(404).json({error: "no such task"})
    }
    res.status(200).json(task)
}

//to update task
const updateTask = async(req, res)=>{
    const {id} = req.params;
    const validId = mongoose.Types.ObjectId.isValid(id);

    if(!validId){
        return res.status(400).json({error: "no such task"})
    }

    const task = await taskModel.findOneAndUpdate({_id:id}, {
        ...req.body
    });

    if(!task){
        return res.status(404).json({error: "no such task"})
    }
    res.status(200).json(task)


}

module.exports = {
    createTask,
    getAllTasks,
    getTask,
    deleteTask,
    updateTask,
}