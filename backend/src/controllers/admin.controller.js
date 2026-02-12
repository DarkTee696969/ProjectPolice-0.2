const db = require("../database");
const { generateItemsExcel } = require("../services/excel.service");

exports.exportItemsExcel = async (req, res) => {
  try {
    const [items] = await db.query(
      "SELECT * FROM items ORDER BY id DESC"
    );

    const workbook = await generateItemsExcel(items);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=police_inventory.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
