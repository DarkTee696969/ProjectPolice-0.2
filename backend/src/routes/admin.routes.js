const express = require("express");
const router = express.Router();

const controller = require("../controllers/admin.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// Export Excel (admin เท่านั้น)
router.get(
  "/export/items",
  auth,
  role(["admin"]),
  controller.exportItemsExcel
);

module.exports = router;
