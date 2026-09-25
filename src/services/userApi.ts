import type { User } from "@/types/user"
import api from "./api"

export interface UsersResponse {
  data: User[]
  total: number
}

export const userApi = {
  getAll: async (): Promise<UsersResponse> => {
    const res = await api.get("/users")
    return res.data
  },

  getById: async (id: string): Promise<User> => {
    const res = await api.get(`/users/${id}`)
    return res.data
  },

  update: async (id: string, data: Partial<User>): Promise<User> => {
    const res = await api.put(`/users/${id}`, data)
    return res.data
  },

  updateStatus: async (id: string, status: string): Promise<User> => {
    const res = await api.patch(`/users/${id}/status`, { status })
    return res.data
  },

  updateRole: async (id: string, role: string): Promise<User> => {
    const res = await api.patch(`/users/${id}/role`, { role })
    return res.data
  },
}
