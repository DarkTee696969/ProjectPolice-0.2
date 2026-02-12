async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  console.log("login response =", data);

  if (!res.ok) {
    alert(data.message || "Login failed");
    return;
  }

  // ⭐ เก็บ token + role
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.role);
  localStorage.setItem("username", data.user.username);

  // ⭐ ไปหน้าหลัก
  window.location.href = "items.html";
}
