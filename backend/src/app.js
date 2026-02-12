const express = require("express");
const app = express();
const adminRoutes = require("./routes/admin.routes");

app.use(express.json());

// 👇 ต้องมีอันนี้
app.use("/api/admin", adminRoutes);
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/items", require("./routes/items.routes"));

module.exports = app;
