require("dotenv").config();
const mongoose = require("mongoose");
const taskModel = require("../models/taskModel");
const taskModelp = require("../models/postgresModels/taskModelp");

const usePosgres = require("../db/connect");


// to get all tasks
const getAllTasks = async (req, res) => {
  // mongo GET ALL
  if (usePosgres === false) {
    const task = await taskModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(task);
  } else {
    //postgre GET ALL
    const task = await taskModelp.findAll();
    res.status(200).json(task);
  }
};

//to get a single task
const getTask = async (req, res) => {
  //mongo GET single
  if (usePosgres === false) {
    const { id } = req.params;

    //to check valid mongoID
    const validId = mongoose.Types.ObjectId.isValid(id);

    if (!validId) {
      return res.status(400).json({ error: "Invalid Id" });
    }
    try {
      const task = await taskModel.findById(id);

      if (!task) {
        return res.status(404).json({ error: "task not found" });
      }
      res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    //postgres GET single

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
  }
};

//to create a task
const createTask = async (req, res) => {
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

  if (usePosgres == false) {
    //mongo POST
    try {
      const parsedDueDate = new Date(dueDate);
      const task = await taskModel.create({
        title,
        description,
        status,
        dueDate: parsedDueDate,
      });
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    //postgres POST

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
  }
};

//to delete task
const deleteTask = async (req, res) => {
  if (usePosgres === false) {
    try {
      //mongo DELETE
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    //posgres DELETE
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
  }
};

//to update task
const updateTask = async (req, res) => {
  console.log(req.body)
  if (usePosgres === false) {
    try {
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
    } catch (error) {
      res.status(500).json({ error: "server error" });
    }
  } else {
    //posgre PUT
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
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  deleteTask,
  updateTask,
};
