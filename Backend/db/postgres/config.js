const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  
  {
    host: "localhost",
    port: "5432",
    dialect: "postgres",
    logging: false,
    
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL database");
  } catch (error) {
    console.error("Unable to connect to the PostgreSQL database:", error);
  }
};

module.exports = { sequelize, connectDB };
