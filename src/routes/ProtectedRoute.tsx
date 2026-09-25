import { useAuthStore } from "@/store/authStore"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login, but save where user was trying to go
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
