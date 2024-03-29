const { DataTypes } = require('sequelize');
const { sequelize } = require("../../db/postgres/config");
const usePosgres = require("../../db/connect")
const validator = require('validator')
const bcrypt = require('bcrypt')

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

  User.signup = async function(email, password) {
    // Validations
    if (!email || !password) {
        throw new Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Enter valid email");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Enter strong password");
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error("Email already exists");
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({ email, password: hash });
    return user;
};

User.login = async function(email, password) {
  // Validation
  if (!email || !password) {
      throw new Error("All fields should be filled");
  }

  // Find user by email
  const user = await User.findOne({ where: { email } });
  if (!user) {
      throw new Error("No user found with this email");
  }

  // Compare passwords
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
      throw new Error("Password is not correct");
  }

  return user;
};

 

  usePosgres && (async () => {
    try {
      await sequelize.sync({ alter: true }); // Sync models with database, alter if necessary
      console.log("user model synced successfully");
    } catch (error) {
      console.error("Error syncing user model:", error);
    }
  })();
  
  module.exports = User
  // `sequelize.define` also returns the model
  // console.log(User === sequelize.models.user); // 