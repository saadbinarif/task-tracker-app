const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres');

const User = sequelize.define('User', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
   
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
  
  // `sequelize.define` also returns the model
  console.log(User === sequelize.models.User); // 