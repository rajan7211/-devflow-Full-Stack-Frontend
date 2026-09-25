import { taskApi, type TaskFilters } from "@/services/taskApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { CreateTaskDto, UpdateTaskDto, Task } from "@/types/task"
import { mockTasks } from "@/utils/mockTasksData"

const STORAGE_KEY = "devflow_mock_tasks"

function isBackendAvailable(): boolean {
  const apiUrl = import.meta.env.VITE_API_URL
  const useMock = localStorage.getItem("devflow_use_mock") === "true" || import.meta.env.VITE_USE_MOCK === "true"
  if (useMock) return false
  return !!apiUrl && !useMock
}

function getMockTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks))
  return mockTasks
}

function saveMockTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function filterMockTasks(tasks: Task[], filters?: TaskFilters): Task[] {
  let filtered = [...tasks]

  if (filters?.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(search) ||
        t.description.toLowerCase().includes(search)
    )
  }

  if (filters?.status) {
    filtered = filtered.filter((t) => t.status === filters.status)
  }

  if (filters?.priority) {
    filtered = filtered.filter((t) => t.priority === filters.priority)
  }

  if (filters?.assignee) {
    filtered = filtered.filter((t) => {
      const assigneeId = typeof t.assignee === "string" ? t.assignee : (t.assignee as any)?._id
      return assigneeId === filters.assignee
    })
  }

  if (filters?.project) {
    filtered = filtered.filter((t) => {
      const projectId = typeof t.project === "string" ? t.project : (t.project as any)?._id
      return projectId === filters.project
    })
  }

  return filtered
}

export function useTasks(filters?: TaskFilters) {
  const queryClient = useQueryClient()

  const tasksQuery = useQuery({
    queryKey: ["tasks", filters],
    queryFn: async () => {
      if (isBackendAvailable()) {
        try {
          return await taskApi.getAll(filters)
        } catch {
          console.log("API tasks failed, using mock (Phase 5)")
        }
      }

      await new Promise((r) => setTimeout(r, 400))

      const all = getMockTasks()
      const filtered = filterMockTasks(all, filters)

      const page = filters?.page || 1
      const limit = filters?.limit || 50
      const start = (page - 1) * limit

      return {
        data: filtered.slice(start, start + limit),
        total: filtered.length,
        page,
        limit,
      }
    },
    placeholderData: (prev) => prev,
  })

  const createMutation = useMutation({
    mutationFn: async (data: CreateTaskDto) => {
      if (isBackendAvailable()) {
        try {
          return await taskApi.create(data)
        } catch {
          console.log("API create task failed, using mock")
        }
      }

      await new Promise((r) => setTimeout(r, 600))

      const newTask: Task = {
        _id: `task-${Date.now()}`,
        title: data.title,
        description: data.description,
        project: data.project,
        assignee: data.assignee,
        createdBy: "mock-admin-1",
        status: (data.status as any) || "TODO",
        priority: data.priority as any,
        labels: data.labels || [],
        dueDate: data.dueDate,
        attachments: [],
        comments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const tasks = getMockTasks()
      tasks.unshift(newTask)
      saveMockTasks(tasks)

      return newTask
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTaskDto }) => {
      if (isBackendAvailable()) {
        try {
          return await taskApi.update(id, data)
        } catch {
          console.log("API update task failed, using mock")
        }
      }

      await new Promise((r) => setTimeout(r, 500))

      const tasks = getMockTasks()
      const idx = tasks.findIndex((t) => t._id === id)
      if (idx === -1) throw new Error("Task not found")

      const updated = { ...tasks[idx], ...data, updatedAt: new Date().toISOString() }
      tasks[idx] = updated as Task
      saveMockTasks(tasks)

      return updated as Task
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      queryClient.invalidateQueries({ queryKey: ["task"] })
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (isBackendAvailable()) {
        try {
          return await taskApi.updateStatus(id, status)
        } catch {
          console.log("API update status failed, using mock")
        }
      }

      await new Promise((r) => setTimeout(r, 300))

      const tasks = getMockTasks()
      const idx = tasks.findIndex((t) => t._id === id)
      if (idx === -1) throw new Error("Task not found")

      tasks[idx] = { ...tasks[idx], status: status as any, updatedAt: new Date().toISOString() }
      saveMockTasks(tasks)

      return tasks[idx]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      queryClient.invalidateQueries({ queryKey: ["task"] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (isBackendAvailable()) {
        try {
          return await taskApi.delete(id)
        } catch {
          console.log("API delete task failed, using mock")
        }
      }

      await new Promise((r) => setTimeout(r, 400))

      const tasks = getMockTasks()
      saveMockTasks(tasks.filter((t) => t._id !== id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })

  return {
    tasks: tasksQuery.data?.data ?? [],
    total: tasksQuery.data?.total ?? 0,
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    createTask: createMutation.mutateAsync,
    updateTask: updateMutation.mutateAsync,
    updateStatus: updateStatusMutation.mutateAsync,
    deleteTask: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    refetch: tasksQuery.refetch,
  }
}

export function useTask(id: string) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      if (isBackendAvailable()) {
        try {
          return await taskApi.getById(id)
        } catch {
          console.log("API get task failed, using mock")
        }
      }

      await new Promise((r) => setTimeout(r, 300))

      const tasks = getMockTasks()
      const task = tasks.find((t) => t._id === id)
      if (!task) throw new Error("Task not found")
      return task
    },
    enabled: !!id,
  })
}
