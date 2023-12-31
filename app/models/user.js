const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Feed = require("./feed");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("Admin", "Super Admin", "Basic"),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.belongsToMany(Feed, { through: "UserFeed", foreignKey: "userId" });

module.exports = User;
