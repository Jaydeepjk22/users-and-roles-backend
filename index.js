const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./app/routes/authRoutes");
const userRoutes = require("./app/routes/userRoutes");
const feedRoutes = require("./app/routes/feedRoutes");
const authMiddleware = require("./app/middlewares/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", authMiddleware.verifyToken, userRoutes);
app.use("/api", authMiddleware.verifyToken, feedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
