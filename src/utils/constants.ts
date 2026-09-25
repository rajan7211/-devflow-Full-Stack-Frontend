export const APP_NAME = "DevFlow"

export const ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  DEVELOPER: "DEVELOPER",
} as const

export const PROJECT_STATUS = {
  PLANNING: "PLANNING",
  ACTIVE: "ACTIVE",
  ON_HOLD: "ON_HOLD",
  COMPLETED: "COMPLETED",
  ARCHIVED: "ARCHIVED",
} as const

export const TASK_STATUS = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
} as const

export const PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  URGENT: "URGENT",
} as const

export const USER_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const

export type Role = typeof ROLES[keyof typeof ROLES]
export type ProjectStatus = typeof PROJECT_STATUS[keyof typeof PROJECT_STATUS]
export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS]
export type Priority = typeof PRIORITY[keyof typeof PRIORITY]

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Review",
  DONE: "Done",
}

export const PRIORITY_COLORS: Record<Priority, string> = {
  LOW: "bg-slate-100 text-slate-700 border-slate-200",
  MEDIUM: "bg-blue-50 text-blue-700 border-blue-200",
  HIGH: "bg-amber-50 text-amber-700 border-amber-200",
  URGENT: "bg-red-50 text-red-700 border-red-200",
}

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, string> = {
  PLANNING: "bg-slate-100 text-slate-600",
  ACTIVE: "bg-emerald-50 text-emerald-700",
  ON_HOLD: "bg-amber-50 text-amber-700",
  COMPLETED: "bg-blue-50 text-blue-700",
  ARCHIVED: "bg-gray-100 text-gray-600",
}
