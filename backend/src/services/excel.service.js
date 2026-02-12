const ExcelJS = require("exceljs");

exports.generateItemsExcel = async (items) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Inventory");

  // หัวตาราง
  worksheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "ชื่อพัสดุ", key: "item_name", width: 25 },
    { header: "หมวดหมู่", key: "category", width: 20 },
    { header: "จำนวน", key: "quantity", width: 10 },
    { header: "สถานีต้นทาง", key: "source_station", width: 20 },
    { header: "วันที่รับเข้า", key: "received_date", width: 15 },
    { header: "วันที่บันทึก", key: "created_at", width: 20 }
  ];

  // ข้อมูล
  items.forEach(item => {
    worksheet.addRow(item);
  });

  // ทำหัวตารางให้เด่น
  worksheet.getRow(1).font = { bold: true };

  return workbook;
};
