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
      commentCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default value is 0
      },
      post_Id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ensure post_Id is required
      },
    },
    {
      timestamps: false, // Disables `createdAt` and `updatedAt` fields
      tableName: "comments",
    }
  );

  // Hook for setting an auto-incrementing commentCount
  Comments.addHook("beforeCreate", async (comment) => {
    const existingComments = await Comments.count({
      where: { post_Id: comment.post_Id },
    });
    comment.commentCount = existingComments + 1; // Increment based on the count of existing comments
  });

  return Comments;
};
