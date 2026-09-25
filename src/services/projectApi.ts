import type { Project, CreateProjectDto, UpdateProjectDto } from "@/types/project"
import api from "./api"

export interface ProjectsResponse {
  data: Project[]
  total: number
  page: number
  limit: number
}

export interface ProjectFilters {
  search?: string
  status?: string
  priority?: string
  page?: number
  limit?: number
}

export const projectApi = {
  getAll: async (filters?: ProjectFilters): Promise<ProjectsResponse> => {
    const res = await api.get("/projects", { params: filters })
    return res.data
  },

  getById: async (id: string): Promise<Project> => {
    const res = await api.get(`/projects/${id}`)
    return res.data
  },

  create: async (data: CreateProjectDto): Promise<Project> => {
    const res = await api.post("/projects", data)
    return res.data
  },

  update: async (id: string, data: UpdateProjectDto): Promise<Project> => {
    const res = await api.put(`/projects/${id}`, data)
    return res.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`)
  },
}
