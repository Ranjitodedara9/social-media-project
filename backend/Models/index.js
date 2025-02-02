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
db.Likes = require("./Likes")(sequelize, DataTypes);

db.Post.hasMany(db.Comments, { foreignKey: "post_Id" });
db.Comments.belongsTo(db.Post);

db.User.hasMany(db.Post, { foreignKey: "user_id" });
db.Post.belongsTo(db.User);

db.Post.hasMany(db.Likes, { foreignKey: "likeId" });
db.Likes.belongsTo(db.Post);

db.User.hasMany(db.Likes, { foreignKey: "user_Id" });
db.Likes.belongsTo(db.User);

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
