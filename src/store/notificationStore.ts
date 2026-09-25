import type { Notification } from "@/types/notification"
import { create } from "zustand"

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  setNotifications: (notifications: Notification[]) => void
  addNotification: (notification: Notification) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  isDropdownOpen: boolean
  setDropdownOpen: (open: boolean) => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  isDropdownOpen: false,

  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),

  markAsRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      )
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.isRead).length,
      }
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),

  setDropdownOpen: (isDropdownOpen) => set({ isDropdownOpen }),
}))
