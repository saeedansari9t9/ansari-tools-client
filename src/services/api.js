// services/api.js

const inferBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) return envUrl;

  if (typeof window !== "undefined") {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isLocal) return "http://localhost:5000/api";
  }

  return "https://ansari-tools-server.vercel.app/api";
};

export const API_BASE_URL = inferBaseUrl();

/**
 * ✅ apiFetch: fetch wrapper
 * - Always sends cookies (admin_token, etc.)
 * - Handles JSON + FormData
 * - Gives better error messages
 */
const apiFetch = async (url, options = {}) => {
  const isFormData = options.body instanceof FormData;

  const res = await fetch(url, {
    credentials: "include", // ✅ IMPORTANT (cookies)
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });

  // If not OK -> extract best error message
  if (!res.ok) {
    let detail = "";
    try {
      const text = await res.text();
      if (text) {
        try {
          const parsed = JSON.parse(text);
          detail = parsed?.message || JSON.stringify(parsed);
        } catch {
          detail = text;
        }
      }
    } catch {
      // ignore
    }

    throw new Error(`Request failed (${res.status}): ${detail || res.statusText}`);
  }

  // Some endpoints may return empty body
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return await res.json();

  // Fallback: return text
  return await res.text();
};

class ApiService {
  // ===================== PRODUCTS =====================

  static async getProducts(category = null) {
    const url = category
      ? `${API_BASE_URL}/products?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/products`;

    return apiFetch(url);
  }

  static async getProduct(id) {
    return apiFetch(`${API_BASE_URL}/products/${id}`);
  }

  static async createProduct(productData) {
    return apiFetch(`${API_BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify(productData),
    });
  }

  static async updateProduct(id, productData) {
    return apiFetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
  }

  static async deleteProduct(id) {
    return apiFetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
  }

  static async uploadImage(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

    return apiFetch(`${API_BASE_URL}/products/upload-image`, {
      method: "POST",
      body: formData, // ✅ FormData auto handled
    });
  }

  // ===================== SALES =====================

  static async createOrUpdateSale(data) {
    return apiFetch(`${API_BASE_URL}/sales`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async getTodaySalesSummary() {
    return apiFetch(`${API_BASE_URL}/sales/today`);
  }

  static async getSalesByDate(date) {
    return apiFetch(`${API_BASE_URL}/sales/by-date?date=${encodeURIComponent(date)}`);
  }

  static async getMonthlySummary({ year, month }) {
    const params = new URLSearchParams({
      year: String(year),
      month: String(month),
    });
    return apiFetch(`${API_BASE_URL}/sales/monthly?${params.toString()}`);
  }

  static async updateSale(id, data) {
    return apiFetch(`${API_BASE_URL}/sales/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  static async deleteSale(id) {
    return apiFetch(`${API_BASE_URL}/sales/${id}`, {
      method: "DELETE",
    });
  }

  // ===================== EXPENSES =====================

  static async addExpense({ title, amount, date, note }) {
    return apiFetch(`${API_BASE_URL}/expenses`, {
      method: "POST",
      body: JSON.stringify({ title, amount, date, note }),
    });
  }

  // ===================== AUTH (OLD users routes) =====================
  // Note: tumhare backend me agar routes /api/admins/login hai,
  // to yahan endpoints adjust kar sakte ho.

  static async login(email, password) {
    return apiFetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  static async signup(email, password) {
    return apiFetch(`${API_BASE_URL}/users/signup`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  // ===================== ADMIN AUTH (Recommended) =====================
  // Agar tum admin cookie-based SSO use kar rahe ho:

  static async adminLogin(email, password) {
    return apiFetch(`${API_BASE_URL}/admins/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  static async adminVerify() {
    return apiFetch(`${API_BASE_URL}/admins/verify`);
  }

  static async adminLogout() {
    return apiFetch(`${API_BASE_URL}/admins/logout`, {
      method: "POST",
    });
  }
}

export default ApiService;
export { apiFetch };
