const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("./user").default;

class Feed extends Sequelize.Model {
  static associate(models) {
    Feed.belongsToMany(models.User, {
      through: "UserFeed",
      foreignKey: "feedId",
      otherKey: "userId",
    });
  }
}

Feed.init(
  {
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
  },
  {
    sequelize, // Pass the sequelize instance here
    modelName: "Feed",
  }
);

module.exports = Feed;
