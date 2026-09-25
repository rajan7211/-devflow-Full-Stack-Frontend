import type { Task, CreateTaskDto, UpdateTaskDto, Comment } from "@/types/task"
import api from "./api"

export interface TasksResponse {
  data: Task[]
  total: number
  page: number
  limit: number
}

export interface TaskFilters {
  search?: string
  status?: string
  priority?: string
  assignee?: string
  project?: string
  page?: number
  limit?: number
}

export const taskApi = {
  getAll: async (filters?: TaskFilters): Promise<TasksResponse> => {
    const res = await api.get("/tasks", { params: filters })
    return res.data
  },

  getById: async (id: string): Promise<Task> => {
    const res = await api.get(`/tasks/${id}`)
    return res.data
  },

  create: async (data: CreateTaskDto): Promise<Task> => {
    const res = await api.post("/tasks", data)
    return res.data
  },

  update: async (id: string, data: UpdateTaskDto): Promise<Task> => {
    const res = await api.put(`/tasks/${id}`, data)
    return res.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`)
  },

  updateStatus: async (id: string, status: string): Promise<Task> => {
    const res = await api.patch(`/tasks/${id}/status`, { status })
    return res.data
  },

  updateAssignee: async (id: string, assignee: string): Promise<Task> => {
    const res = await api.patch(`/tasks/${id}/assignee`, { assignee })
    return res.data
  },

  // Comments
  getComments: async (taskId: string): Promise<Comment[]> => {
    const res = await api.get(`/tasks/${taskId}/comments`)
    return res.data
  },

  addComment: async (taskId: string, content: string): Promise<Comment> => {
    const res = await api.post(`/tasks/${taskId}/comments`, { content })
    return res.data
  },
}
