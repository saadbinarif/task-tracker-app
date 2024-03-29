const { DataTypes } = require('sequelize');
const { sequelize } = require("../../db/postgres/config");
const usePosgres = require("../../db/connect")

const User = sequelize.define('user', {
   
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
  }, );

 

  usePosgres && (async () => {
    try {
      await sequelize.sync({ alter: true }); // Sync models with database, alter if necessary
      console.log("user model synced successfully");
    } catch (error) {
      console.error("Error syncing user model:", error);
    }
  })();
  
  // `sequelize.define` also returns the model
  // console.log(User === sequelize.models.user); // 