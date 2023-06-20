const User = require("../models/user");
const Feed = require("../models/feed");
const sequelize = require("../../config/database");
const logToFile = require("../utils/logger");

const createUser = async (req, res) => {
  const { name, role, email, password } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const user = await User.create(
      { name, role, email, password },
      { transaction }
    );

    await transaction.commit();

    logToFile(`User created: ID ${user.id}, Name: ${user.name}`);

    return res.json({ id: user.id });
  } catch (error) {
    await transaction.rollback();

    logToFile(`Error creating user: ${error}`);

    return res.status(500).json({ message: "Error in creating user" });
  }
};

const updateUserAccess = async (req, res) => {
  const { userId } = req.params;
  const { feedIds } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { transaction });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const feeds = await Feed.findAll({ where: { id: feedIds }, transaction });

    if (feeds.length !== feedIds.length) {
      return res.status(404).json({ message: "One or more feeds not found" });
    }

    await user.setFeeds(feeds, { transaction });

    await transaction.commit();

    logToFile(`User access updated:ID ${userId}, feedIds: ${feedIds}`);

    return res.json({ message: "User access updated" });
  } catch (error) {
    await transaction.rollback();

    logToFile(`Error updating user access: ${error}`);

    return res.status(500).json({ message: "Error updating user access" });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, role, email, password } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { transaction });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user attributes
    user.name = name;
    user.role = role;
    user.email = email;
    user.password = password;

    await user.save({ transaction });

    await transaction.commit();

    logToFile(`User updated: ID ${userId}, Name: ${user.name}`);

    return res.json({ message: "User updated" });
  } catch (error) {
    await transaction.rollback();

    logToFile(`Error updating user: ${error}`);

    return res.status(500).json({ message: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const transaction = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { transaction });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy({ transaction });

    await transaction.commit();

    logToFile(`User deleted: ID ${userId}`);

    return res.json({ message: "User deleted" });
  } catch (error) {
    await transaction.rollback();

    logToFile(`Error deleting user: ${error}`);

    return res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  updateUserAccess,
};
