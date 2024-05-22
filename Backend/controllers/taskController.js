require("dotenv").config();
const mongoose = require("mongoose");
const taskModel = require("../models/taskModel");
const taskModelp = require("../models/postgresModels/taskModelp");
const joi = require("joi");
const tagModel = require("../models/tagModel");
const {format} = require("date-fns")

//validation schema for task
const taskSchema = joi.object({
  title: joi.string().min(3).max(500).required(),
  description: joi.string().min(1).max(2000),
  status: joi.string().min(1).max(20),
  dueDate: joi.date(),
  creator_id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  subtasks: joi.array().items(
    joi.object({
      title: joi.string().min(1).max(500).required(),
      isComplete: joi.boolean().required(),
    })
  ),
  tags: joi.array().items(joi.string()),
});

//validation schema for subtask
const subtaskSchema = joi.object({
  title: joi.string().min(1).max(500).required(),
  isComplete: joi.boolean().required(),
});

//To calculate progress while creating and updating task
const calculateProgress = (subtasks) => {
  const totalSubtasks = subtasks.length;
  if (subtasks.length === 0) return 0;
  const CompletedSubtasks = subtasks.filter(
    (subtask) => subtask.isComplete
  ).length;
  const percentage = (CompletedSubtasks / totalSubtasks) * 100;
  return Math.round(percentage);
};

// to get all tasks
const getAllTasks = async (req, res) => {
  const creator_id = req.user._id;
  const task = await taskModel
    .find({ creator_id })
    .sort({ createdAt: -1 })
    .populate("tags");
  return res.status(200).json(task);
};

//to get a single task
const getTask = async (req, res) => {
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

//creator_id="6619a78db6b20d62a6bb56e0",
//to create a task
const createTask = async (req, res) => {
  // coming from req headers via requireAuth middleware
  const creator_id = req.user._id;
  // console.log(creator_id)
  const { title, description, status, dueDate, subtasks, tags } = req.body;
  // console.log('CTpayload', "title:", title, 'description:', description, 'status:', status, 'dueDate: ', dueDate, "subtasks:",subtasks, 'tags:', tags)
  console.log("date recieved", dueDate);
  // joi schema validation
  const result = taskSchema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const defaultStatus = "in progress";
  const defaultProgress = 0;
  const defaultSubtasks = [];
  const defaultTags = [];

  const progress = calculateProgress(subtasks || []);

  // console.log(parsedDueDate)

  const task = await taskModel.create({
    title,
    description,
    status: status || defaultStatus,
    subtasks: subtasks || defaultSubtasks,
    progress,
    dueDate: dueDate,
    creator_id,
    tags: tags || defaultTags,
  });

  console.log("createTaskApi", task.dueDate);

  return res.status(200).json(task);
};

//to delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  const validId = mongoose.Types.ObjectId.isValid(id);
  console.log("DTID:", id);
  if (!validId) {
    return res.status(400).json({ error: "Invalid Id" });
  }

  const task = await taskModel.findOneAndDelete({ _id: id });

  if (!task) {
    return res.status(404).json({ error: "task not found" });
  }
  return res.status(200).json({ message: "Task deleted successfully", task });
};

//to update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const validId = mongoose.Types.ObjectId.isValid(id);

  if (!validId) {
    return res.status(400).json({ error: "Invalid Id" });
  }

  const task = await taskModel.findById(id).populate('tags');
  if (!task) return res.status(404).json({ error: "no such task" });

  task.title = req.body.title ? req.body.title : task.title;
  (task.description = req.body.description
    ? req.body.description
    : task.description),
    (task.status = req.body.status ? req.body.status : task.status),
    (task.subtasks = req.body.subtasks ? req.body.subtasks : task.subtasks),
    (task.progress = req.body.progress ? req.body.progress : task.progress),
    (task.dueDate = req.body.dueDate ? new Date(req.body.dueDate) : task.dueDate),
    task.creator_id,
    (task.tags = req.body.tags ? req.body.tags : task.tags)

    const currentDate = format(new Date(), 'dd-MM-yyyy')
    const reqDate = format(task.dueDate, 'dd-MM-yyyy')
    console.log("todayDate", currentDate)
    console.log("Date", reqDate)
    if(reqDate < currentDate){
      task.status = 'overdue' 
    }
    else{
      if(task.progress == 100){
        task.status = 'completed'
      }
      else{
        task.status = 'in progress'
      }
    }
    
    await task.save();

  // const result = taskSchema.validate(req.body)
  //   if(result.error){
  //      res.status(400).send(result.error.details[0].message)
  //      return;
  //   }

  // const task = await taskModel.findOneAndUpdate(
  //   { _id: id },
  //   {
  //     ...req.body,
  //   }
  // );

  // if (!task) {
  //   return res.status(404).json({ error: "no such task" });
  // }
  return res.status(200).json(task);
};

//to create subtasks
const createSubtask = async (req, res) => {
  const { taskid } = req.params;

  const task = await taskModel.findById(taskid).populate('tags');
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // const result = subtaskSchema.validate(req.body)
  // if(result.error){
  // return res.status(400).send(result.error.details[0].message)

  // }
  const title = req.body.title ? req.body.title : title;
  const isCompleteCheck = req.body.isComplete ? req.body.isComplete : false;

  const newSubtask = {
    title,
    // isComplete: req.body.isComplete
    isComplete: isCompleteCheck,
  };
  console.log("req subtask:", newSubtask);

  const subtasks = task.subtasks.push(newSubtask);
  console.log(task.subtasks)
  const progress = calculateProgress(task.subtasks)
  console.log('progress',progress)
  task.progress = progress;
    const currentDate = format(new Date(), 'dd-MM-yyyy')
    const reqDate = format(task.dueDate, 'dd-MM-yyyy')
    const nullDate = format(new Date(1970, 0, 1), 'dd-MM-yyyy')
    
    if(reqDate < currentDate && reqDate != nullDate){
      task.status = 'overdue' 
    }
    else{
      if(task.progress == 100){
        task.status = 'completed'
      }
      else{
        task.status = 'in progress'
      }
    }
  await task.save();

  res.status(201).json({message:"Subtask created successfully", task});
};

//to update subtasks

const updateSubtask = async (req, res) => {
  const { taskid, subtaskid } = req.params;
  // const {title, isComplete} = req.body;
  console.log("ustTaskId", taskid, "\nustSubTaskId", subtaskid);
  console.log(
    "ustTitle",
    req.body.title,
    "\nustIscomplete",
    req.body.isComplete
  );

  const task = await taskModel.findById(taskid).populate('tags');
  if (!task) return res.status(404).json({ error: "task not found" });

  const subtask = task.subtasks.id(subtaskid);
  if (!subtask) return res.status(404).json({ error: "subtask not found" });

  // const result = subtaskSchema.validate(req.body)
  //       if(result.error){
  //       return res.status(400).send(result.error.details[0].message)

  //       }
  
  

  const title = req.body.title ? req.body.title : subtask.title;

  subtask.title = title;
  subtask.isComplete = req.body.isComplete;
  task.progress = calculateProgress(task.subtasks);
  if(task.progress == 100){
    task.status = 'completed'
  }
  else{
    task.status = 'in progress'
  }

  await task.save();

  return res.status(200).json({ message: "subtask updated", task: task });
};

//to delete subtask
const deleteSubtask = async (req, res) => {
  const { taskid, subtaskid } = req.params;
  const task = await taskModel.findById(taskid).populate('tags');
  if (!task) return res.status(404).json({ message: "Task not found" });

  const subtaskIndex = task.subtasks.findIndex(
    (subtask) => subtask._id.toString() === subtaskid
  );
  if (subtaskIndex === -1) {
    return res.status(404).json({ message: "Subtask not found" });
  }

  task.subtasks.splice(subtaskIndex, 1);
  task.progress = calculateProgress(task.subtasks);
  await task.save();

  return res.status(200).json({ message: "subtask Deleted", task: task });
};

//to add tags to the task
const AddTags = async(req,res)=>{
  const { taskId, tagId } = req.params;

        // Find the task by ID
        let task = await taskModel.findById(taskId).populate('tags');
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Find the tag by ID
        const tag = await tagModel.findById(tagId);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }

        // Check if the tag is already added to the task
        if (task.tags.includes(tagId)) {
            return res.status(400).json({ error: 'Tag already added to task' });
        }

        // Add the tag to the task
        task.tags.push(tagId);
        await task.populate('tags')
        await task.save();

        res.status(200).json({ message: "tag added to the task", task });
}


//remove tag from the task
const RemoveTags = async(req, res)=>{
  const {taskId, tagId} = req.params  
  console.log('tagId:', tagId)
  const task = await taskModel.findById(taskId).populate('tags')
  if (!task)
    return res.status(404).json({ message: "task not found", success: false });

  // const foundTag = task.tags.find(tag=>tag._id == tagId)
  //   task.tags.pop(foundTag)

  const tagIndex = task.tags.findIndex(tag => tag._id == tagId);
    if (tagIndex === -1) {
      return res.status(404).json({ message: "Tag not found", success: false });
    }

    task.tags.splice(tagIndex, 1);
  await task.save()

  return res.status(200).json({message:"tag removed", success:'true', task})

}

const autoComplete = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Search field is empty" });
  }

  const suggestions = await taskModel
    .find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Case-insensitive title match
        { description: { $regex: query, $options: "i" } }, // Case-insensitive description match
        // { tags: { $regex: query, $options: 'i' } } // Case-insensitive tag match
      ],
    })
    .limit(10); // Limit to 10 suggestions
  console.log(suggestions);
  res.json(suggestions);
};

//-------------postgres controllers

// const getAllTasksPosgres = async (req, res) => {
//   //postgre GET ALL
//   const task = await taskModelp.findAll();
//   res.status(200).json(task);
// };

// const getTaskPosgres = async (req, res) => {
//   const { id } = req.params;

//   // Check if the ID is a valid integer
//   if (!Number.isInteger(parseInt(id))) {
//     return res.status(400).json({ error: "Invalid Id" });
//   }

//   try {
//     const task = await taskModelp.findByPk(id);

//     if (!task) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     res.status(200).json(task);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

// const createTaskPosgres = async (req, res) => {
//   const { title, description, status, dueDate } = req.body;

//   let emptyFields = [];

//   if (!title) {
//     emptyFields.push("title");
//   }
//   if (!description) {
//     emptyFields.push("description");
//   }
//   if (!status) {
//     emptyFields.push("status");
//   }
//   if (emptyFields.length > 0) {
//     return res
//       .status(400)
//       .json({ error: "Please fill all the fields", emptyFields });
//   }
//   try {
//     if (!dueDate) {
//       parsedDueDate = null;
//     } else {
//       const parsedDueDate = new Date(dueDate);
//     }

//     const task = await taskModelp.create({
//       title,
//       description,
//       status,
//       dueDate: parsedDueDate,
//     });
//     res.status(200).json(task);
//     console.log(req.body);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const deleteTaskPosgres = async (req, res) => {
//   const { id } = req.params;

//   if (typeof id !== "string" || id.trim() === "") {
//     return res.status(400).json({ error: "Invalid Id" });
//   }
//   try {
//     const task = await taskModelp.findOne({ where: { id } });
//     if (!task) {
//       res.status(404).json({ error: "task not found" });
//     }
//     await task.destroy();
//     res.status(200).json(task);
//   } catch (error) {
//     res.status(500).json({ error: "server error" });
//   }
// };

// const updateTaskPosgres = async (req, res) => {
//   const { id } = req.params;

//   if (typeof id !== "string" || id.trim() === "") {
//     return res.status(400).json({ error: "Invalid Id" });
//   }

//   try {
//     const task = await taskModelp.findOne({ where: { id } });

//     if (!task) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     // Update the task
//     await task.update(req.body);

//     res.status(200).json(task);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  deleteTask,
  updateTask,
  autoComplete,
  createSubtask,
  updateSubtask,
  deleteSubtask,
  AddTags,
  RemoveTags
};
