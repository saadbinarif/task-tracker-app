require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const tasksRoutes = require("./routes/tasksRoutes");
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const { connectDB } = require("./db/postgres/config.js");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
var cors = require("cors");
let usePosgres = require("./db/connect.js")

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
      app.listen(process.env.PORT, () => {
        console.log("Connected to mongoDB database");
        console.log("usePosgres", usePosgres);
      });
    })
    .catch((err) => console.log(err));
}

app.use(express.json());

app.use("/tasks", tasksRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
