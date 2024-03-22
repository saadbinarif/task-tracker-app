const express = require('express');
const tasksRoutes = require('./routes/tasksRoutes')
const usersRoutes = require('./routes/usersRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express();

app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

app.listen(3000, ()=>{
    console.log("listening at 3000...")
});

