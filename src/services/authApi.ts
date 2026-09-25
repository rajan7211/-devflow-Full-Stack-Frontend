import type { AuthResponse, ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from "@/types/auth"
import type { User } from "@/types/user"
import api from "./api"

export const authApi = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const res = await api.post("/auth/login", data)
    return res.data
  },

  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const res = await api.post("/auth/register", data)
    return res.data
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout")
  },

  me: async (): Promise<User> => {
    const res = await api.get("/auth/me")
    return res.data
  },

  forgotPassword: async (data: ForgotPasswordDto): Promise<{ message: string }> => {
    const res = await api.post("/auth/forgot-password", data)
    return res.data
  },

  resetPassword: async (data: ResetPasswordDto): Promise<{ message: string }> => {
    const res = await api.post("/auth/reset-password", data)
    return res.data
  },
}
