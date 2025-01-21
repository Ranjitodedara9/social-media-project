module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      commentBody: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      post_Id: DataTypes.INTEGER,
    },
    {
      timestamps: false, // Enables `createdAt` and `updatedAt` fields
      tableName: "comments",
    }
  );

  return Comments;
};
