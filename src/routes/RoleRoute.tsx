import { useAuthStore } from "@/store/authStore"
import type { Role } from "@/utils/constants"
import { Navigate, Outlet } from "react-router-dom"

interface RoleRouteProps {
  allowedRoles: Role[]
}

export function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
