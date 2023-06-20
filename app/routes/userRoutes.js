const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/login", authController.authenticateUser);
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
