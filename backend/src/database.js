const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const bcrypt = require("bcrypt");


const dbPath = path.join(__dirname, "database.db");

const db = new sqlite3.Database(dbPath);

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    )
  `);

  db.get("SELECT * FROM users WHERE username = ?", ["admin"], (err, row) => {
    if (!row) {
      bcrypt.hash("1234", 10, (err, hash) => {
        if (!err) {
          db.run(
            "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
            ["admin", hash, "admin"]
          );
          console.log("Default admin created");
        }
      });
    }
  });

  // สร้าง user policer
db.get("SELECT * FROM users WHERE username = ?", ["police"], (err, row) => {
  if (!row) {
    bcrypt.hash("1234", 10, (err, hash) => {
      if (!err) {
        db.run(
          "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
          ["police", hash, "user"]  // role เป็น user
        );
        console.log("Default policer created");
      }
    });
  }
});


  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      asset_number TEXT NOT NULL,
      item_name TEXT NOT NULL,
      category TEXT,
      quantity INTEGER DEFAULT 0,
      source_station TEXT,
      remark TEXT,
      received_date TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

});

module.exports = db;
