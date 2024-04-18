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


const http = require('http');
const cron = require('node-cron');
const socketSetup = require('./socket'); 
const { checkTaskExpiry } = require('./taskService');


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
const io = socketSetup(server);



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

setInterval(() => {
  checkTaskExpiry(io);
}, 60000);

//----------------------------------------------------------------


app.use("/auth", authRoutes);
app.use("/tags", tagsRoutes);

app.use("/tasks", tasksRoutes);
app.use("/users", usersRoutes);

app.use(errorHandler);


module.exports = server.listen(process.env.PORT, () => {
  console.log("Connected to mongoDB database", process.env.MONGO_URI) });