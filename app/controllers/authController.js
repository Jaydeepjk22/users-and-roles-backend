const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwtConfig = require("../../config/jwt");

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtConfig.secret
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Error authenticating user" });
  }
};

module.exports = {
  authenticateUser,
};
