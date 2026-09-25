import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes/AppRoutes"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: 0,
    },
  },
})

function App() {
  const { setAuth } = useAuthStore()

  // For Phase 1 demo: inject mock user so layout shows data
  // This will be removed once real auth is wired in Phase 14
  useEffect(() => {
    const existingUser = localStorage.getItem("devflow_user")
    if (!existingUser) {
      const mockUser = {
        _id: "mock-admin-id",
        name: "Ronak Patel",
        email: "admin@devflow.com",
        role: "ADMIN" as const,
        status: "ACTIVE" as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      // Only set if no auth exists - allows real auth to override later
      // For Phase 1 we want to show UI without login, so we auto-authenticate
      setAuth(mockUser, "mock-jwt-token-phase1")
    }
  }, [setAuth])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
