import type { Priority, TaskStatus } from "@/utils/constants"
import type { User } from "./user"
import type { Project } from "./project"

export interface Task {
  _id: string
  title: string
  description: string
  project: string | Project
  assignee?: string | User
  createdBy: string | User
  status: TaskStatus
  priority: Priority
  labels: string[]
  dueDate?: string
  attachments?: Attachment[]
  comments?: string[]
  createdAt: string
  updatedAt: string
}

export interface Attachment {
  filename: string
  url: string
  size: number
  mimeType: string
  uploadedAt: string
}

export interface Comment {
  _id: string
  task: string
  user: string | User
  content: string
  createdAt: string
  updatedAt: string
}

export interface CreateTaskDto {
  title: string
  description: string
  project: string
  assignee?: string
  priority: Priority
  status?: TaskStatus
  labels?: string[]
  dueDate?: string
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}
