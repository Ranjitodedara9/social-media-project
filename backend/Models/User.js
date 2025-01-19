module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // Model attributes are defined here
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "users",
    }
  );
  return User;
};
