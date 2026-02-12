const API = "http://localhost:3000/api/items";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const username = localStorage.getItem("username");

// ❌ ถ้าไม่ล็อกอิน
if (!token) {
  window.location.href = "login.html";
}

// แสดงข้อมูลผู้ใช้
document.getElementById("userInfo").innerText =
  `ผู้ใช้: ${username} | Role: ${role}`;

// ซ่อน admin panel ถ้าไม่ใช่ admin
if (role !== "admin") {
  document.getElementById("adminPanel").style.display = "none";
  document.getElementById("actionHeader").style.display = "none";
}

// โหลดรายการ
async function loadItems() {
  const res = await fetch(API, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const items = await res.json();
  const table = document.getElementById("itemsTable");
  table.innerHTML = "";

  items.forEach(i => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${i.id}</td>
      <td>${i.item_name}</td>
      <td>${i.category}</td>
      <td>${i.quantity}</td>
      ${
        role === "admin"
          ? `<td>
              <button onclick="openEdit(${i.id}, '${i.item_name}', '${i.category}', ${i.quantity})">แก้ไข</button>
              <button onclick="deleteItem(${i.id})">ลบ</button>
            </td>`
          : ""
      }
    `;

    table.appendChild(tr);
  });
}

// ➕ เพิ่มพัสดุ
async function addItem() {
  const body = {
    item_name: item_name.value,
    category: category.value,
    quantity: quantity.value
  };

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(body)
  });

  item_name.value = "";
  category.value = "";
  quantity.value = "";

  loadItems();
}

// ❌ ลบ
async function deleteItem(id) {
  if (!confirm("ยืนยันการลบ?")) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  });

  loadItems();
}

/* =======================
   ✏️ EDIT (MODAL)
======================= */

function openEdit(id, name, category, quantity) {
  document.getElementById("edit_id").value = id;
  document.getElementById("edit_item_name").value = name;
  document.getElementById("edit_category").value = category;
  document.getElementById("edit_quantity").value = quantity;

  document.getElementById("editModal").showModal();
}

function closeEdit() {
  document.getElementById("editModal").close();
}

async function saveEdit() {
  const id = document.getElementById("edit_id").value;

  const body = {
    item_name: edit_item_name.value,
    category: edit_category.value,
    quantity: edit_quantity.value
  };

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(body)
  });

  closeEdit();
  loadItems();
}

/* =======================
   📤 EXPORT EXCEL (.xlsx)
======================= */

async function exportCSV() {
  const res = await fetch(API, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const items = await res.json();

  if (!items.length) {
    alert("ไม่มีข้อมูลให้ export");
    return;
  }

  // แปลงข้อมูลเป็นรูปแบบ Excel
  const data = items.map(i => ({
    ID: i.id,
    ชื่อพัสดุ: i.item_name,
    ประเภท: i.category,
    จำนวน: i.quantity
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");

  XLSX.writeFile(workbook, "police_inventory.xlsx");
}

// 🚪 logout
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

loadItems();
