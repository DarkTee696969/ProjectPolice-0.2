function init() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token) {
    location.href = "login.html";
    return;
  }

  document.getElementById("roleText").innerText = `Role: ${role}`;

  if (role === "viewer") {
    hide("addBtn");
    hide("editBtn");
    hide("deleteBtn");
    hide("exportBtn");
  }

  if (role === "officer") {
    hide("deleteBtn");
    hide("exportBtn");
  }
}

function hide(id) {
  document.getElementById(id).style.display = "none";
}

function logout() {
  localStorage.clear();
  location.href = "login.html";
}

function exportExcel() {
  const data = [
    { name: "Item A", price: 100 },
    { name: "Item B", price: 200 },
  ];

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Items");
  XLSX.writeFile(wb, "items.xlsx");
}
