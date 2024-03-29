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
 *  paths:
 *   /tasks/{id}:
 *     put:
 *       summary: "Update Task"
 *       description: "Update an existing task in the database"
 *       parameters:
 *         - name: "id"
 *           in: "path"
 *           description: "ID of the task to update"
 *           required: true
 *           type: "string"
 *         - name: "body"
 *           in: "body"
 *           description: "Updated task object"
 *           required: true
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
 *       responses:
 *         200:
 *           description: "Task updated successfully"
 *         400:
 *           description: "Invalid input, object invalid"
 *         404:
 *           description: "Task not found"
 *         500:
 *           description: "Internal server error"
 */