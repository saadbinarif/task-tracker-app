const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth')
const tryCatch = require('../middlewares/tryCatch');
const {
    createTask,
    getAllTasks,
    getTask,
    deleteTask,
    updateTask,
    autoComplete,
    createSubtask,
    updateSubtask,
    deleteSubtask

} = require('../controllers/taskController');



const router = express.Router();

router.use(requireAuth)

//searchparams
router.get('/autocomplete', tryCatch(autoComplete))

//get all tasks
router.get('/', tryCatch(getAllTasks))

//get a specific task by id
router.get('/:id', tryCatch(getTask) )

//post a task
router.post('/', tryCatch(createTask))

//update a task
router.put('/:id', tryCatch(updateTask))

//delete a task
router.delete('/:id', tryCatch(deleteTask))

//create a subtask
router.post('/:taskid/subtask', tryCatch(createSubtask))

//update subtask
router.put('/:taskid/subtask/:subtaskid', tryCatch(updateSubtask))

//delete subtask
router.delete('/:taskid/subtask/:subtaskid', tryCatch(deleteSubtask))




module.exports = router




/**
 * @swagger
 * components:
 *   schemas:
 *     Tasks:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - status 
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto generated ID of the user
 *         title:
 *           type: string
 *           description: Main heading of the task
 *         description:
 *           type: string
 *           description: Details of the task
 *         status:
 *           type: string
 *           description: completion status of the task
 *         dueDate: 
 *           type: date
 *           description: Deadline of the task   
 *         
 *       example:
 *         _id: aslkdjskdjlad3add
 *         title: complete project
 *         description: Complete task tracking project at piecyfer
 *         status: in progress
 *         dueDate: 2024-07-15T00:00:00.000Z
 *         
 */

/**
 * tags:
 *  name: Tasks
 *  description: The Tasks APIs
 */

//routes
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: returns the list of all the tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: The list of all the Tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tasks'
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Returns a single task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single task object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * paths:
 *   /tasks/{id}:
 *     delete:
 *       summary: Delete a task by id
 *       tags:
 *         - Tasks
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the task to delete
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Task deleted successfully
 *         '400':
 *           description: Invalid Id
 *         '404':
 *           description: Task not found
 *         '500':
 *           description: server error
 *         
 */



/**
 * @swagger
 * paths:
 *  /tasks:
 *   post:
 *     summary: "Create a task by id"
 *     tags:
 *         - Tasks 
 *     parameters: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               title:
 *                 type: "string"
 *                 description: "Title of the task"
 *               description:
 *                 type: "string"
 *                 description: "Description of the task"
 *               status:
 *                 type: "string"
 *                 description: "Status of the task"
 *               dueDate:
 *                 type: "string"
 *                 format: "date"
 *                 description: "Due date of the task (format: YYYY-MM-DD)"
 *             required:
 *               - title
 *               - status
 *               - dueDate
 *     responses:
 *       201:
 *         description: "Task created successfully"
 *         schema:
 *           type: "object"
 *           properties:
 *             _id:
 *               type: "string"
 *               description: "ID of the created task"
 *       400:
 *         description: "Invalid input, object invalid"
 *       500:
 *         description: "Internal server error"
 */

/**
 * @swagger
 * paths:
 *   /tasks/{id}:
 *     put:
 *       summary: 'Update a Task'
 *       tags:
 *         - Tasks
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - title
 *                 - description
 *                 - dueDate
 *               properties:
 *                 id:
 *                  type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dueDate:
 *                  type: date
 *               example:
 *                 id: 1234
 *                 title: Updated Task
 *                 noteDescription: This is a new task
 *                 date: "2022-12-31"
 *       responses:
 *         '200':
 *           description: Task updated successfully
 *         '400':
 *           description: Invalid Id
 *         '404':
 *           description: Task not found
 */

