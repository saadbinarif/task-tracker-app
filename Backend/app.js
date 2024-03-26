require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const tasksRoutes = require("./routes/tasksRoutes");
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const { connectDB } = require("./db/postgres/config.js");


const app = express();
connectDB();
// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     app.listen(process.env.PORT, () => {
//     console.log(`Connected to db & listening on port ${process.env.PORT}`);
//   });
// })
// .catch(err => console.log(err))

app.use(express.json());

app.use("/tasks", tasksRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
