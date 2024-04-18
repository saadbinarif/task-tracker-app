const moment = require('moment');
const taskModel = require('./models/taskModel'); // Import your task model if needed

async function checkTaskExpiry(io) {
    const tasks = await taskModel.find({ dueDate: { $gt: new Date(), $lt: moment().add(30, 'minutes').toDate() } });
    tasks.forEach(task => {
        io.emit(`task_expires`, { message: `Your task "${task.title}" is due in 30 minutes.` });
    });
}

module.exports = { checkTaskExpiry };