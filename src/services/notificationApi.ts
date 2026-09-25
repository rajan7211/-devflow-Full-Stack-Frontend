import type { Activity, Notification } from "@/types/notification"
import api from "./api"

export const notificationApi = {
  getAll: async (): Promise<Notification[]> => {
    const res = await api.get("/notifications")
    return res.data
  },

  markAsRead: async (id: string): Promise<void> => {
    await api.patch(`/notifications/${id}/read`)
  },

  markAllAsRead: async (): Promise<void> => {
    await api.patch("/notifications/read-all")
  },
}

export const activityApi = {
  getAll: async (params?: Record<string, string>): Promise<Activity[]> => {
    const res = await api.get("/activity", { params })
    return res.data
  },
}
