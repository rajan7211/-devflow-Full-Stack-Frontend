import type { User } from "@/types/user"
import { create } from "zustand"
import { persist } from "zustand/middleware"

const DEMO_USER: User = {
  _id: "demo-admin",
  name: "Ronak Patel",
  email: "admin@devflow.com",
  role: "ADMIN",
  status: "ACTIVE",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null

  const rawUser = localStorage.getItem("devflow_user")
  if (!rawUser) return null

  try {
    return JSON.parse(rawUser) as User
  } catch {
    return null
  }
}

const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("devflow_token")
}

const hasStoredSession = () => {
  if (typeof window === "undefined") return false
  return !!getStoredToken() && !!getStoredUser()
}

const DEMO_TOKEN = "demo-devflow-token"
const defaultUser = hasStoredSession() ? getStoredUser() : DEMO_USER
const defaultToken = hasStoredSession() ? getStoredToken() : DEMO_TOKEN

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setAuth: (user: User, token: string) => void
  setUser: (user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: defaultUser,
      token: defaultToken,
      isAuthenticated: true,
      isLoading: false,

      setAuth: (user, token) => {
        localStorage.setItem("devflow_token", token)
        localStorage.setItem("devflow_user", JSON.stringify(user))
        set({ user, token, isAuthenticated: true, isLoading: false })
      },

      setUser: (user) => {
        localStorage.setItem("devflow_user", JSON.stringify(user))
        set({ user })
      },

      logout: () => {
        localStorage.removeItem("devflow_token")
        localStorage.removeItem("devflow_user")
        set({ user: null, token: null, isAuthenticated: false, isLoading: false })
      },

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "devflow-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      merge: (persistedState, currentState) => {
        const state = persistedState as Partial<AuthState> | undefined
        const hasValidSession = !!state?.token && !!state?.user

        if (!hasValidSession) {
          const fallbackState = {
            ...currentState,
            user: DEMO_USER,
            token: DEMO_TOKEN,
            isAuthenticated: true,
            isLoading: false,
          }

          localStorage.setItem("devflow_token", DEMO_TOKEN)
          localStorage.setItem("devflow_user", JSON.stringify(DEMO_USER))

          return fallbackState
        }

        return {
          ...currentState,
          ...state,
          isAuthenticated: Boolean(state?.isAuthenticated && state?.user && state?.token),
        }
      },
    }
  )
)
