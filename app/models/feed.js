const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("./user");

const Feed = sequelize.define("Feed", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Feed.belongsToMany(User, { through: "UserFeed", foreignKey: "feedId" });

module.exports = Feed;
