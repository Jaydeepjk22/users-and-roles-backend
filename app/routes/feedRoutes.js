const express = require("express");
const feedController = require("../controllers/feedController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/feeds", authMiddleware.verifyToken, feedController.createFeed);
router.put(
  "/feeds/:feedId",
  authMiddleware.verifyToken,
  feedController.updateFeed
);
router.delete(
  "/feeds/:feedId",
  authMiddleware.verifyToken,
  feedController.deleteFeed
);

module.exports = router;
