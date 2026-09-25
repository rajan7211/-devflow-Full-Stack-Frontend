import type { Priority, ProjectStatus } from "@/utils/constants"
import type { User } from "./user"

export interface Project {
  _id: string
  name: string
  description: string
  status: ProjectStatus
  priority: Priority
  startDate: string
  dueDate: string
  owner: string | User
  members: (string | User)[]
  progress?: number
  tasksCount?: number
  completedTasks?: number
  createdAt: string
  updatedAt: string
}

export interface CreateProjectDto {
  name: string
  description: string
  priority: Priority
  startDate: string
  dueDate: string
  members?: string[]
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {
  status?: ProjectStatus
}
