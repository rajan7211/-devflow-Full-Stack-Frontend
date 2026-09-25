import { projectApi, type ProjectFilters } from "@/services/projectApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { CreateProjectDto, UpdateProjectDto, Project } from "@/types/project"
import { mockProjects } from "@/utils/mockProjectsData"

const STORAGE_KEY = "devflow_mock_projects"
const USE_MOCK_KEY = "devflow_use_mock"

function isBackendAvailable(): boolean {
  const apiUrl = import.meta.env.VITE_API_URL
  const useMock = localStorage.getItem(USE_MOCK_KEY) === "true" || import.meta.env.VITE_USE_MOCK === "true"
  if (useMock) return false
  // For Phase 4, we default to mock unless backend is explicitly working
  // Check if we have a real backend - if API URL is localhost and no backend running, use mock
  return !!apiUrl && !useMock
}

function getMockProjects(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {}
  // Initialize with mock data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProjects))
  return mockProjects
}

function saveMockProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

function filterMockProjects(projects: Project[], filters?: ProjectFilters): Project[] {
  let filtered = [...projects]

  if (filters?.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    )
  }

  if (filters?.status) {
    filtered = filtered.filter((p) => p.status === filters.status)
  }

  if (filters?.priority) {
    filtered = filtered.filter((p) => p.priority === filters.priority)
  }

  return filtered
}

export function useProjects(filters?: ProjectFilters) {
  const queryClient = useQueryClient()

  const projectsQuery = useQuery({
    queryKey: ["projects", filters],
    queryFn: async () => {
      if (isBackendAvailable()) {
        try {
          const result = await projectApi.getAll(filters)
          return result
        } catch {
          console.log("API failed, using mock projects (Phase 4)")
        }
      }

      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 400))

      const allProjects = getMockProjects()
      const filtered = filterMockProjects(allProjects, filters)

      // Simulate pagination
      const page = filters?.page || 1
      const limit = filters?.limit || 20
      const start = (page - 1) * limit
      const paginated = filtered.slice(start, start + limit)

      return {
        data: paginated,
        total: filtered.length,
        page,
        limit,
      }
    },
    placeholderData: (prev) => prev,
  })

  const createMutation = useMutation({
    mutationFn: async (data: CreateProjectDto) => {
      if (isBackendAvailable()) {
        try {
          return await projectApi.create(data)
        } catch {
          console.log("API create failed, using mock (Phase 4)")
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 600))

      const newProject: Project = {
        _id: `proj-${Date.now()}`,
        name: data.name,
        description: data.description,
        priority: data.priority,
        status: "PLANNING",
        startDate: data.startDate,
        dueDate: data.dueDate,
        owner: "mock-admin-1",
        members: data.members || ["mock-admin-1"],
        progress: 0,
        tasksCount: 0,
        completedTasks: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const projects = getMockProjects()
      projects.unshift(newProject)
      saveMockProjects(projects)

      return newProject
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateProjectDto }) => {
      if (isBackendAvailable()) {
        try {
          return await projectApi.update(id, data)
        } catch {
          console.log("API update failed, using mock (Phase 4)")
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 500))

      const projects = getMockProjects()
      const index = projects.findIndex((p) => p._id === id)
      if (index === -1) throw new Error("Project not found")

      const updated = {
        ...projects[index],
        ...data,
        updatedAt: new Date().toISOString(),
      }

      projects[index] = updated as Project
      saveMockProjects(projects)

      return updated as Project
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      queryClient.invalidateQueries({ queryKey: ["project"] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (isBackendAvailable()) {
        try {
          return await projectApi.delete(id)
        } catch {
          console.log("API delete failed, using mock (Phase 4)")
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 400))

      const projects = getMockProjects()
      const filtered = projects.filter((p) => p._id !== id)
      saveMockProjects(filtered)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })

  return {
    projects: projectsQuery.data?.data ?? [],
    total: projectsQuery.data?.total ?? 0,
    isLoading: projectsQuery.isLoading,
    isError: projectsQuery.isError,
    error: projectsQuery.error,
    createProject: createMutation.mutateAsync,
    updateProject: updateMutation.mutateAsync,
    deleteProject: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    refetch: projectsQuery.refetch,
  }
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (isBackendAvailable()) {
        try {
          return await projectApi.getById(id)
        } catch {
          console.log("API getById failed, using mock (Phase 4)")
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 300))

      const projects = getMockProjects()
      const project = projects.find((p) => p._id === id)
      if (!project) throw new Error("Project not found")
      return project
    },
    enabled: !!id,
  })
}
