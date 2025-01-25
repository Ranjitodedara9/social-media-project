module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("likes", {
    likeId: DataTypes.INTEGER,
    user_Id: DataTypes.INTEGER,
  });

  return Likes;
};
