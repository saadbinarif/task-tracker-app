require("dotenv").config();
const mongoose = require("mongoose");
const taskModel = require("../models/taskModel");
const taskModelp = require("../models/postgresModels/taskModelp");



// to get all tasks
const getAllTasks = async (req, res) => {

  // const creator_id = req.user._id;
  const task = await taskModel.find({}).sort({ createdAt: -1 });
  return res.status(200).json(task);
};

//to get a single task
const getTask = async (req, res, next) => {

  const { id } = req.params;

  //to check valid mongoID
  const validId = mongoose.Types.ObjectId.isValid(id);

  if (!validId) {
    return res.status(400).json({ error: "Invalid Id" });

  }

  const task = await taskModel.findById(id);

  if (!task) {
    return res.status(404).json({ error: "task not found" });
    
  }
  return res.status(200).json(task);

};

//to create a task
const createTask = async (req, res) => {
  const { title, description, status, dueDate, creator_id="6619a78db6b20d62a6bb56e0" } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!status) {
    emptyFields.push("status");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields", emptyFields });
  }


  // coming from req headers via requireAuth middleware
  // const creator_id = req.user._id;
  const parsedDueDate = new Date(dueDate);
  const task = await taskModel.create({
    title,
    description,
    status,
    dueDate: parsedDueDate,
    creator_id,
  });
  res.status(200).json(task);


};

//to delete task
const deleteTask = async (req, res) => {


  const { id } = req.params;
  const validId = mongoose.Types.ObjectId.isValid(id);

  if (!validId) {
    return res.status(400).json({ error: "Invalid Id" });
  }

  const task = await taskModel.findOneAndDelete({ _id: id });

  if (!task) {
    return res.status(404).json({ error: "task not found" });
  }
  res.status(200).json(task);

};

//to update task
const updateTask = async (req, res) => {

  const { id } = req.params;
  const validId = mongoose.Types.ObjectId.isValid(id);

  if (!validId) {
    return res.status(400).json({ error: "Invalid Id" });
  }

  const task = await taskModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!task) {
    return res.status(404).json({ error: "no such task" });
  }
  res.status(200).json(task);

};



const autoComplete = async (req, res) => {

  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const suggestions = await taskModel.find({
    $or: [
      { title: { $regex: query, $options: 'i' } }, // Case-insensitive title match
      { description: { $regex: query, $options: 'i' } }, // Case-insensitive description match
      // { tags: { $regex: query, $options: 'i' } } // Case-insensitive tag match
    ]
  }).limit(10); // Limit to 10 suggestions
  console.log(suggestions)
  res.json(suggestions);

}


//-------------postgres controllers

const getAllTasksPosgres = async (req, res) => {
  //postgre GET ALL
  const task = await taskModelp.findAll();
  res.status(200).json(task);
};

const getTaskPosgres = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid integer
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: "Invalid Id" });
  }

  try {
    const task = await taskModelp.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const createTaskPosgres = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!status) {
    emptyFields.push("status");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields", emptyFields });
  }
  try {
    if (!dueDate) {
      parsedDueDate = null;
    } else {
      const parsedDueDate = new Date(dueDate);
    }

    const task = await taskModelp.create({
      title,
      description,
      status,
      dueDate: parsedDueDate,
    });
    res.status(200).json(task);
    console.log(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTaskPosgres = async (req, res) => {
  const { id } = req.params;

  if (typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({ error: "Invalid Id" });
  }
  try {
    const task = await taskModelp.findOne({ where: { id } });
    if (!task) {
      res.status(404).json({ error: "task not found" });
    }
    await task.destroy();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

const updateTaskPosgres = async (req, res) => {
  const { id } = req.params;

  if (typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({ error: "Invalid Id" });
  }

  try {
    const task = await taskModelp.findOne({ where: { id } });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the task
    await task.update(req.body);

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  deleteTask,
  updateTask,
  autoComplete
};
