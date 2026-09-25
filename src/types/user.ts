import type { Role } from "@/utils/constants"

export interface User {
  _id: string
  name: string
  email: string
  avatar?: string
  role: Role
  status: "ACTIVE" | "INACTIVE"
  createdAt: string
  updatedAt: string
}

export interface UserStats {
  total: number
  active: number
  inactive: number
}
