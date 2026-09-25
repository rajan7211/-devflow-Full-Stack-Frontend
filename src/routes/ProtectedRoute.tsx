import { useAuthStore } from "@/store/authStore"
import { Outlet } from "react-router-dom"

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore()

  // For Phase 1, we allow access without real auth, but structure is ready
  // In Phase 2, this will enforce auth
  // Uncomment to enforce:
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />
  // }

  // For demo Phase 1, allow always - but keep logic ready
  if (!isAuthenticated) {
    // In Phase 1 we show layout anyway with mock user
    // Return outlet to allow viewing UI
    return <Outlet />
  }

  return <Outlet />
}
