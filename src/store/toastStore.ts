import { create } from "zustand"

export type ToastType = "success" | "error" | "info" | "warning"

export interface Toast {
  id: string
  title: string
  description?: string
  type: ToastType
  duration?: number
}

interface ToastState {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      id,
      duration: 4000,
      ...toast,
    }
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }))

    // Auto remove after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }))
      }, newToast.duration)
    }
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))

// Helper hook for easy usage
export function useToast() {
  const { addToast } = useToastStore()

  return {
    toast: (props: Omit<Toast, "id">) => addToast(props),
    success: (title: string, description?: string) =>
      addToast({ title, description, type: "success" }),
    error: (title: string, description?: string) =>
      addToast({ title, description, type: "error" }),
    info: (title: string, description?: string) =>
      addToast({ title, description, type: "info" }),
  }
}
