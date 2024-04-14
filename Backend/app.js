require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const tagsRoutes = require("./routes/tagsRoutes.js")
const tasksRoutes = require("./routes/tasksRoutes");
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const { connectDB } = require("./db/postgres/config.js");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
var cors = require("cors");
let usePosgres = require("./db/connect.js")
const errorHandler = require("./middlewares/errorHandler.js");

// const {checkTaskExpiry } = require('./notificationService');
const http = require('http');
const cron = require('node-cron');
const socketIo = require('socket.io');
const taskModel = require("./models/taskModel.js");
const moment = require('moment');


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task-Tracker-APIs",
      version: "1.0.0",
      description: "piecyfer project",
    },

    server: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const server = http.createServer(app);
const io = socketIo(server);



if (usePosgres) {
  //postgres connection
  connectDB();
 
  app.listen(process.env.PORT, () => {
    console.log("listening to port 4000");
    console.log("usePostgres:", usePosgres);
  });
} else {
  //Mongo connection
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
    //  module.exports = server.listen(process.env.PORT, () => {
    //     console.log("Connected to mongoDB database", process.env.MONGO_URI);
    //     console.log("usePosgres", usePosgres);
        

    //   });
    })
    .catch((err) => console.log(err));
}

app.use(express.json());

// ---------------------------------------------------------------



// Notification cron job
// cron.schedule('* * * * *', () => {
//   checkTaskExpiry(io);
// });

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // Disconnect event
  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});

// Function to check for tasks due within 30 minutes and send notifications
async function checkTaskExpiry() {
    const tasks = await taskModel.find({ dueDate: { $gt: new Date(), $lt: moment().add(30, 'minutes').toDate() } });
    tasks.forEach(task => {
        io.emit(`task_expires`, { message: `Your task "${task.title}" is due in 30 minutes.` });
    });
}

// Check task expiry every minute
setInterval(checkTaskExpiry, 60 * 1000);

// ---------------------------------------------------------------


app.use("/auth", authRoutes);
app.use("/tags", tagsRoutes);

app.use("/tasks", tasksRoutes);
app.use("/users", usersRoutes);

app.use(errorHandler);


module.exports = server.listen(process.env.PORT, () => {
  console.log("Connected to mongoDB database", process.env.MONGO_URI) });