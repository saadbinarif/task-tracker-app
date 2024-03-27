const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres');
// Define the Task model
const Task = sequelize.define('task', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATE
  }
}, {
  
});

module.exports = Task;
