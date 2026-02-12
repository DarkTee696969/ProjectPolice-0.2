const db = require("../database");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const passwordService = require("../services/password.service");

exports.login = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";

  db.get(sql, [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    try {
      const match = await passwordService.compare(
        password,
        user.password
      );

      if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
