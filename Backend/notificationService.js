const cron = require('node-cron');
const { addMinutes, isWithinInterval } = require('date-fns');
const taskModel = require('./models/taskModel');
const userModel = require('./models/userModel');
const WebSocket = require('ws');

const notifyUsers = async () => {
    const tasks = await taskModel.find();
    const now = new Date();
    const deadline = addMinutes(now, 30); // 30 minutes before the due date
  
    for (const task of tasks) {
      if (isWithinInterval(deadline, { start: now, end: new Date(task.dueDate) })) {
        const user = await userModel.findById(task.creator_id);
        if (user) {
          // Assuming you have WebSocket connection for each user
          user.ws.send(JSON.stringify({ message: `Task "${task.title}" is due in 30 minutes!` }));
        }
      }
    }
  };
  
  // Schedule notification check every minute
  cron.schedule('*/1 * * * *', notifyUsers);