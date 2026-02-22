export const API_BASE = "http://localhost:3000";

const handleResponse = (res) => {
  if (!res.ok) return Promise.reject(res);
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
};

export const api = {
  get: (url) => fetch(`${API_BASE}${url}`).then(handleResponse),
  post: (url, data) =>
    fetch(`${API_BASE}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse),
  patch: (url, data) =>
    fetch(`${API_BASE}${url}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse),
  put: (url, data) =>
    fetch(`${API_BASE}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse),
  delete: (url) =>
    fetch(`${API_BASE}${url}`, {
      method: "DELETE",
    }).then(handleResponse),
};
