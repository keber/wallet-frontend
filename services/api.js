const API = "https://wallet-api.keber.cl";

export async function apiCall(endpoint, method = "GET", body = null) {
  const options = { method, headers: { "Content-Type": "application/json" } };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${API}${endpoint}`, options);
  const contentType = res.headers.get("Content-Type");

  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const message =
      data?.detail?.[0]?.msg || data?.detail || data?.message || "Error del servidor";
    throw new Error(message);
  }

  return data;
}
