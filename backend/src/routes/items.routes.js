const express = require("express");
const router = express.Router();

const controller = require("../controllers/items.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// GET
router.get(
  "/",
  auth,
  controller.getItems
);

// POST
router.post(
  "/",
  auth,
  role(["admin", "officer"]),
  controller.createItem
);

// PUT (แก้ไข)
router.put(
  "/:id",
  auth,
  role(["admin", "officer"]),
  controller.updateItem
);

// DELETE (ลบ)
router.delete(
  "/:id",
  auth,
  role(["admin"]),
  controller.deleteItem
);

module.exports = router;
