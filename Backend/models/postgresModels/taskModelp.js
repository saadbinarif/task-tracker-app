const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/postgres/config");
// Define the Task model
const Task = sequelize.define(
  "task",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {}
);

(async () => {
  try {
    await sequelize.sync({ alter: true }); // Sync models with database, alter if necessary
    console.log("Task model synced successfully");
  } catch (error) {
    console.error("Error syncing task model:", error);
  }
})();

module.exports = Task;
