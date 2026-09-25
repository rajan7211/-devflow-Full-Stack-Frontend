import { taskApi, type TaskFilters } from "@/services/taskApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { CreateTaskDto, UpdateTaskDto } from "@/types/task"

export function useTasks(filters?: TaskFilters) {
  const queryClient = useQueryClient()

  const tasksQuery = useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => taskApi.getAll(filters),
    placeholderData: (prev) => prev,
  })

  const createMutation = useMutation({
    mutationFn: (data: CreateTaskDto) => taskApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskDto }) =>
      taskApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      taskApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => taskApi.delete(id),
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
    refetch: tasksQuery.refetch,
  }
}

export function useTask(id: string) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => taskApi.getById(id),
    enabled: !!id,
  })
}
