// api.js
const API_BASE = "https://wallet-api.keber.cl";

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Credenciales inválidas");
  return await res.json();
}

export async function register(name, email, password) {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).detail || "Error en registro");
  return await res.json();
}

export async function getBalance(email) {
  const res = await fetch(`${API_BASE}/balance/${email}`);
  if (!res.ok) throw new Error("Error al obtener saldo");
  return await res.json();
}

export async function getTransactions(email) {
  const res = await fetch(`${API_BASE}/transactions/${email}`);
  if (!res.ok) throw new Error("Error al obtener transacciones");
  return await res.json();
}

export async function addMoney(email, amount) {
  const res = await fetch(`${API_BASE}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, amount }),
  });
  if (!res.ok) throw new Error("Error al añadir dinero");
  return await res.json();
}

export async function sendMoney(sender_email, recipient_email, amount, note) {
  const res = await fetch(`${API_BASE}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender_email, recipient_email, amount, note }),
  });
  if (!res.ok) throw new Error((await res.json()).detail || "Error al enviar dinero");
  return await res.json();
}

