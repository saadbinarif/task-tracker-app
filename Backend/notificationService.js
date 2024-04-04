
const { formatDistanceToNow } = require('date-fns');
const taskModel = require('./models/taskModel');


const checkTaskExpiry = async (io) => {
  const tasks = await taskModel.find({ dueDate: { $gte: new Date(), $lte: new Date(Date.now() + 30 * 60000) } });
  tasks.forEach(task => {
    const timeRemaining = formatDistanceToNow(task.dueDate, { includeSeconds: true });
    io.emit(`taskExpiry-${task._id}`, `Task "${task.title}" is due in ${timeRemaining}`);
    console.log(`Task "${task.title}" is due in ${timeRemaining}`);
  });
};

module.exports = { checkTaskExpiry };