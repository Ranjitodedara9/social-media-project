const { Sequelize } = require("sequelize");

// Database connection
const sequelize = new Sequelize("social-media", "root", "Mysql@@@###123", {
  host: "https://social-media-project-test.onrender.com",
  logging: false,
  dialect: "mysql",
});

module.exports = sequelize;
