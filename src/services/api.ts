import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
})

// Request interceptor - attach JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("devflow_token")
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message || "Something went wrong"

    if (status === 401) {
      // Token expired or invalid
      localStorage.removeItem("devflow_token")
      localStorage.removeItem("devflow_user")
      // Only redirect if not already on auth pages
      if (!window.location.pathname.includes("/login") && !window.location.pathname.includes("/register")) {
        window.location.href = "/login"
      }
    }

    // Attach user-friendly message
    error.userMessage = message
    return Promise.reject(error)
  }
)

export default api
