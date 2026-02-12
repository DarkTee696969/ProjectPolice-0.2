module.exports = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "ไม่มีสิทธิ์เข้าถึง" });
    }
    next();
  };
};
