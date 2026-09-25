import type { User } from "@/types/user"
import { create } from "zustand"
import { persist } from "zustand/middleware"

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
      user: null,
      token: null,
      isAuthenticated: false,
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
    }
  )
)
