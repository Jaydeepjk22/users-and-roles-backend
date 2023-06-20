const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/users", authMiddleware.verifyToken, userController.createUser);
router.put(
  "/users/:userId",
  authMiddleware.verifyToken,
  userController.updateUser
);
router.delete(
  "/users/:userId",
  authMiddleware.verifyToken,
  userController.deleteUser
);
router.put(
  "/users/:userId/access",
  authMiddleware.verifyToken,
  userController.updateUserAccess
);

module.exports = router;
