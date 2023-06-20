const Feed = require("../models/feed");
const sequelize = require("../../config/database");
const logToFile = require("../utils/logger");

const createFeed = async (req, res) => {
  const { name, url, description } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const feed = await Feed.create({ name, url, description }, { transaction });

    await transaction.commit();

    logToFile(`Feed created: ID ${feed.id}, Name: ${feed.name}`);

    return res.json({ id: feed.id });
  } catch (error) {
    await transaction.rollback();

    logToFile(`Error creating feed: ${error}`);

    return res.status(500).json({ message: "Error creating feed" });
  }
};

const updateFeed = async (req, res) => {
  const { feedId } = req.params;
  const { name, url, description } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const feed = await Feed.findByPk(feedId, { transaction });

    if (!feed) {
      return res.status(404).json({ message: "Feed not found" });
    }

    // Update feed attributes
    feed.name = name;
    feed.url = url;
    feed.description = description;

    await feed.save({ transaction });

    await transaction.commit();

    logToFile(`Feed updated:ID ${feedId}, Name: ${feed.name} `);

    return res.json({ message: "Feed updated" });
  } catch (error) {
    await transaction.rollback();

    logToFile(`Error updating feed: ${error}`);

    return res.status(500).json({ message: "Error updating feed" });
  }
};

const deleteFeed = async (req, res) => {
  const { feedId } = req.params;

  const transaction = await sequelize.transaction();

  try {
    const feed = await Feed.findByPk(feedId, { transaction });

    if (!feed) {
      return res.status(404).json({ message: "Feed not found" });
    }

    await feed.destroy({ transaction });

    await transaction.commit();

    logToFile(`Feed deleted: ID ${feedId}`);

    return res.json({ message: "Feed deleted" });
  } catch (error) {
    await transaction.rollback();

    logToFile(`Error deleting feed: ${error}`);

    return res.status(500).json({ message: "Error deleting feed" });
  }
};

module.exports = {
  createFeed,
  updateFeed,
  deleteFeed,
};
