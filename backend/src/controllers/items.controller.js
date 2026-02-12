const db = require("../database");

// =======================
// GET ALL
// =======================
exports.getItems = (req, res) => {
  const sql = "SELECT * FROM items ORDER BY id DESC";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// =======================
// CREATE
// =======================
exports.createItem = (req, res) => {
  const {
    asset_number,
    item_name,
    category,
    quantity,
    source_station,
    received_date,
    remark
  } = req.body;

  const sql = `
    INSERT INTO items
    (asset_number, item_name, category, quantity, source_station, received_date, remark)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [asset_number, item_name, category, quantity, source_station, received_date, remark],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        message: "Item created",
        id: this.lastID
      });
    }
  );
};

// =======================
// UPDATE
// =======================
exports.updateItem = (req, res) => {
  const { id } = req.params;

  const {
    asset_number,
    item_name,
    category,
    quantity,
    source_station,
    received_date,
    remark
  } = req.body;

  const sql = `
    UPDATE items SET
      asset_number = ?,
      item_name = ?,
      category = ?,
      quantity = ?,
      source_station = ?,
      received_date = ?,
      remark = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [asset_number, item_name, category, quantity, source_station, received_date, remark, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ message: "แก้ไขข้อมูลสำเร็จ" });
    }
  );
};

// =======================
// DELETE
// =======================
exports.deleteItem = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM items WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "ลบข้อมูลสำเร็จ" });
  });
};
