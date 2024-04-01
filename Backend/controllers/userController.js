require("dotenv").config();
const express = require("express");
const userModel = require("../models/userModel");
const userModelp = require("../models/postgresModels/userModelp.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

let usePosgres = require("../db/connect");

console.log("value in userCont", usePosgres);

//to get all users for admin
const getUsers = async (req, res) => {
  
    try {
      const users = await userModel
        .find({})
        // .select("id email")
        .sort({ createdAt: -1 });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
};

//to delete user for admin
const deleteUser = async (req, res) => {
  
    try {
      const { id } = req.params;
      const validId = mongoose.Types.ObjectId.isValid(id);
      if (!validId) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const user = await userModel.findOneAndDelete({ _id: id });
      if (!user) {
        return res.status(404).json({ error: "no such user" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "server error" });
    }
  
};

//to update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, currentPassword, newPassword } = req.body;

  try {
    //check if the given value in request params is valid
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) throw Error("Invalid user ID");

    //Check if the user with the provided id is in the database
    const user = await userModel.findById(id);
    if (!user) throw Error("User not found");

    //validate the email and password format in the params
    if (!email) throw Error("Email is required");
    if (!validator.isEmail(email)) throw Error("Invalid email format");
    if (newPassword && !validator.isStrongPassword(newPassword))
      throw Error("Password should be strong");
    if (!currentPassword)
      throw Error("Current password is required to make changes");

    //check if new email already exist for someother user
    const emailExists = await userModel.findOne({ email, _id: { $ne: id } });
    if (emailExists) throw Error("Email already exists");

    user.email = email;

    //match the current password and hash the new
    const matchPassword = await bcrypt.compare(currentPassword, user.password);
    if (!matchPassword) throw Error("Password is incorrect");

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedNewPassword;
    }

    await user.save();

    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//------ Posgres controllers --------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------

const getUsersPosgres = async(req, res)=>{
  try {
    const users = await userModelp.findAll({ attributes: ["id", "email"] });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

const deleteUserPosgres = async(req, res) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string" || id.trim() === "") {
      return res.status(404).json({ error: "Invalid Id" });
    }
    try {
      const task = await userModelp.findOne({ where: { id } });
      if (!task) {
        return res.status(404).json({ error: "User not found" });
      }
      await task.destroy();
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "server error" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



const updateUserPosgres = async (req, res) => {
  const { id } = req.params;
  const { email, currentPassword, newPassword } = req.body;

  try {
    // Check if the given value in request params is valid
    if (typeof id !== "string" || id.trim() === "") {
      return res.status(404).json({ error: "Invalid Id" });
    }

    // Check if the user with the provided id is in the database
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    // Validate the email format in the params
    if (!email) {
      throw new Error("Email is required");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }
    if (!currentPassword) {
      throw new Error("Current password is required to make changes");
    }

    // Check if new email already exists for some other user
    const emailExists = await userModelp.findOne({ where: { email, id: { [Op.ne]: id } } });
    if (emailExists) {
      throw new Error("Email already exists");
    }

    user.email = email;

    // Match the current password
    const matchPassword = await bcrypt.compare(currentPassword, user.password);
    if (!matchPassword) {
      throw new Error("Password is incorrect");
    }

    // Hash the new password if provided
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedNewPassword;
    }

    await user.save();

    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  updateUser,
  getUsersPosgres,
  deleteUserPosgres,
  updateUserPosgres
};
