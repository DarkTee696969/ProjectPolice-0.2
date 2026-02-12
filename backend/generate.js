const bcrypt = require("bcrypt");

async function run() {
  const password = "123456"; // รหัสที่ต้องการตั้ง
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
}

run();
