import { authApi } from "@/services/authApi"
import { useAuthStore } from "@/store/authStore"
import type { LoginDto, RegisterDto } from "@/types/auth"
import type { User } from "@/types/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Mock users for Phase 2 - no backend yet
const MOCK_USERS: Record<string, User> = {
  "admin@devflow.com": {
    _id: "mock-admin-1",
    name: "Ronak Patel",
    email: "admin@devflow.com",
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  "manager@devflow.com": {
    _id: "mock-manager-1",
    name: "Rahul Sharma",
    email: "manager@devflow.com",
    role: "MANAGER",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  "developer@devflow.com": {
    _id: "mock-dev-1",
    name: "Amit Kumar",
    email: "developer@devflow.com",
    role: "DEVELOPER",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
}

function getMockUser(email: string, name?: string): User {
  const lowerEmail = email.toLowerCase()
  if (MOCK_USERS[lowerEmail]) {
    return MOCK_USERS[lowerEmail]
  }
  // Default mock for any email - infer role from email
  let role: User["role"] = "DEVELOPER"
  if (lowerEmail.includes("admin")) role = "ADMIN"
  else if (lowerEmail.includes("manager")) role = "MANAGER"

  return {
    _id: `mock-${Date.now()}`,
    name: name || email.split("@")[0],
    email: email,
    role,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

function isBackendAvailable(): boolean {
  // Check if we have a real backend URL configured and not localhost in production
  // For Phase 2, we always use mock unless explicitly enabled
  const apiUrl = import.meta.env.VITE_API_URL
  // If no API URL or it's localhost and we are in mock mode, use mock
  // We use mock when VITE_USE_MOCK is true or when API fails
  return import.meta.env.VITE_USE_MOCK !== "true" && !!apiUrl
}

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, logout, setLoading } = useAuthStore()
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: async (data: LoginDto) => {
      // Try real API first if backend is configured
      if (isBackendAvailable()) {
        try {
          const result = await authApi.login(data)
          return result
        } catch (error) {
          // Fallback to mock on API error for Phase 2
          console.log("API login failed, using mock auth (Phase 2)")
        }
      }

      // Mock login - simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Simple validation for mock
      if (data.password.length < 6) {
        throw new Error("Invalid credentials")
      }

      const mockUser = getMockUser(data.email)
      return {
        user: mockUser,
        token: `mock-jwt-${mockUser._id}-${Date.now()}`,
      }
    },
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setAuth(data.user, data.token)
    },
    onSettled: () => setLoading(false),
  })

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterDto) => {
      if (isBackendAvailable()) {
        try {
          const result = await authApi.register(data)
          return result
        } catch (error) {
          console.log("API register failed, using mock auth (Phase 2)")
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = getMockUser(data.email, data.name)
      return {
        user: mockUser,
        token: `mock-jwt-${mockUser._id}-${Date.now()}`,
      }
    },
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setAuth(data.user, data.token)
    },
    onSettled: () => setLoading(false),
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (isBackendAvailable()) {
        try {
          await authApi.logout()
        } catch {
          // Ignore API errors on logout
        }
      }
      // Always clear local state
    },
    onSuccess: () => {
      logout()
      queryClient.clear()
    },
    onError: () => {
      logout()
      queryClient.clear()
    },
  })

  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.me(),
    enabled: !!token && !user && isBackendAvailable(),
    retry: false,
  })

  return {
    user,
    token,
    isAuthenticated,
    isLoading: useAuthStore((s) => s.isLoading) || loginMutation.isPending || registerMutation.isPending,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    meQuery,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    isLoginPending: loginMutation.isPending,
    isRegisterPending: registerMutation.isPending,
  }
}
