module.exports = {
  secret: process.env.JWT_SECRET || "police_secret_key",
  expiresIn: "1d",
};
