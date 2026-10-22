import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.kabadfactory.com/api"
});

export function setAdminToken(token) {
  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : undefined;
}
