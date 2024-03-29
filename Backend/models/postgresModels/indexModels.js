const sequelize = require('../../db/postgres/config');

const task = require("./taskModelp")
const user = require("./userModelp")

user.hasMany(task)
task.belongsTo(user);
