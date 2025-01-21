const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const db = {};

// Attach Sequelize and the connection instance
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initialize models
db.Post = require("./Post")(sequelize, DataTypes);
db.User = require("./User")(sequelize, DataTypes);
db.Comments = require("./Comments")(sequelize, DataTypes);

db.Post.hasMany(db.Comments, { foreignKey: "post_Id" });
db.Comments.belongsTo(db.Post);

// Sync the models with the database
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

module.exports = db;
