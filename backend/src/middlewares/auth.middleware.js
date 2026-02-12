// src/middlewares/auth.middleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ⭐ ส่งต่อให้ role middleware
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
