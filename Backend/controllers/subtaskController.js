require("dotenv").config();
const mongoose = require("mongoose");
const subtaskModel = require("../models/subtaskModel");

const getSubtasks = async(req, res)=>{
    const getSubtask = await subtaskModel.find({})
}